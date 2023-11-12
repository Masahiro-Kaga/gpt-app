const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const express = require("express");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");

const mongoURL = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.MONGODB_ATLAS_PROD;
  } else if (process.env.NODE_ENV === "development") {
    return process.env.MONGODB_ATLAS_DEV;
  } else if (process.env.DOCKER_ENV) {
    // Docker environment variables. Flexible setting for any user.
    const driver = process.env.MONGODB_DRIVER;
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;
    return `${driver}${username}:${password}@${database}`;
  }
};

/**
 * Static class for connecting to DB and making calls.
 */
class DBHandler {
  /**
   * Initialize the mongoose connection and enable for Promises.
   * @returns {boolean} Whether the connection passed or not.
   */
  static async init() {

    try {
      await mongoose.connect(mongoURL());
      colorLog("green", `\nSuccessfully connected to DB\n`);
      return true;
    } catch (error) {
      colorLog("red", `\nCould not connect to DB\n error: ${error.message}\n`);
      return false;
    }
  }

  static mongoURL() {
    if (process.env.NODE_ENV === "production") {
      return process.env.MONGODB_ATLAS_PROD;
    } else if (process.env.NODE_ENV === "development") {
      return process.env.MONGODB_ATLAS_DEV;
    } else if (process.env.DOCKER_ENV) {
      // Docker environment variables. Flexible setting for any user.
      const driver = process.env.MONGODB_DRIVER;
      const username = process.env.MONGODB_USERNAME;
      const password = process.env.MONGODB_PASSWORD;
      const database = process.env.MONGODB_DATABASE;
      return `${driver}${username}:${password}@${database}`;
    }
  };


  static async getMiddlewareSession() {
    const router = express.Router();
    let sessionMiddleware = null;

    router.use(cookieParser());

    if (mongoose !== undefined && mongoose.connection !== undefined) {
  
      sessionMiddleware = session({
        sameSite: "lax",
        secret: process.env.SESSION_SECRET,
        resave: false,
        rolling: true,
        saveUninitialized: false,

        cookie: {
          secure: process.env.NODE_ENV === "production" ? true : false,
          httpOnly: true,
          maxAge: +(process.env.SESSION_TIMEOUT || 4 * 60 * 60 * 1000),
        },
        proxy: true,
        store: MongoStore.create({
          mongoUrl: DBHandler.mongoURL(),
          autoRemove: "interval",
          autoRemoveInterval: 10,
        }),
      });
      router.use(sessionMiddleware);
    }

    return router;
  }
}

/**
 * Display a console log output in a specified color.
 *
 * @param {string} color 	The color to display in.
 * @param {(number | string | Array | object)} value	The value to output.
 */
function colorLog(color, value) {
  const colors = {
    green: chalk.green,
    red: chalk.red,
    orange: chalk.magenta,
    cyan: chalk.cyan,
    blue: chalk.blue,
  };

  console.log(colors[color](value));
}

module.exports = { DBHandler, mongoURL };
