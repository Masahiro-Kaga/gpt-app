const cors = require("cors");
const path = require("path");
const fs = require("fs");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

/**
 * Static class for updating different routing components.
 */
class RouteHandler {
  /**
   * Grab all middleware route configs.
   *
   * @returns {object} Express router object.
   */
  static getMiddlewareRoutes() {
    const router = express.Router();

    // Allow security protocols via default helmet middleware(s).
    router.use(helmet({ contentSecurityPolicy: false }));

    const origin = [];
    if (process.env.NODE_ENV === "development") {
      origin.push(`http://localhost:${process.env.REACT_APP_CLIENT_PORT}`);
    } else {
      origin.push(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`);
      origin.push(process.env.REACT_APP_URL);
    }

    const corsSettings = { origin };
    corsSettings.credentials = true;

    router.use(cors(corsSettings));
    return router;
  }

  /**
   * Grab all api routes in /routes.
   *
   * @param {Function|boolean} apiRateLimitMiddleware Optional function to handle API rate limits on all API endpoints.
   * @returns {object} Express router object.
   */
  static async getApiRoutes(apiRateLimitMiddleware = false) {
    const router = express.Router();

    // Rate limit all API endpoints because of DDOS attacks.
    const skipRoutes = [
      "/api/gptHandler",
      "/api/imageGenerator",
      "/api/audioScriptor",
      "/api/user/register",
    ];
    router.use(
      rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 10, // limit each IP to 10 requests per windowMs
        skip: function (req, res) {
          return !skipRoutes.some((route) => req.path.startsWith(route));
        },
        handler: (req, res) => {
          res.status(429).json("Too many requests, please try again later.");
        },
      })
    );

    const apiTypes = ["api"];

    // Register both /api and /migrate endpoints.
    for (const type of apiTypes) {
      const apiDir = fs.readdirSync(path.join(__dirname, `./${type}`));
      for (const r of apiDir) {
        if (r === "utilities") continue;

        const endpoint = r.replace(".js", "");
        if (apiRateLimitMiddleware !== false) {
          router.use(`/${type}/${endpoint}/`, apiRateLimitMiddleware);
        }
        try {
          const importedModule = await require(`./${type}/${endpoint}`);
          router.use(`/${type}/${endpoint}/`, importedModule);
        } catch (error) {
          console.error(`Error importing module: ./${type}/${r}`, error);
        }
      }
    }

    //--------------------deployment--------------------
    if (process.env.NODE_ENV === "production") {
      router.use(express.static(path.join(global.globalDir, "build")));

      router.get("*", (req, res) =>
        res.sendFile(path.resolve(global.globalDir, "build", "index.html"))
      );
    } else {
      router.get("/", (req, res) => {
        res.send("API is running..");
      });
    }
    //--------------------deployment--------------------

    router.use((err, req, res, next) => {
      if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.json({
          pass: false,
          data: "Validation errors please see details.",
          errors: err.error.details.map((d) => d.message),
        });
      } else {
        // pass on to another error handler
        next(err);
      }
    });

    router.use((req, res) => {
      res
        .status(404)
        .json({ path: false, data: `Endpoint ${req.url} not found.` });
    });

    return router;
  }
}

module.exports = { RouteHandler };
