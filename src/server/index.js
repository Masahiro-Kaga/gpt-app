const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
require("module-alias/register");

global.globalDir = path.resolve(__dirname, "../..");
global.serverDir = path.resolve(__dirname);
global.routesDir = path.resolve(__dirname, "./routes");
global.modulesDir = path.resolve(__dirname, "./modules");

dotenv.config();
const port = process.env.REACT_APP_SERVER_PORT;
const app = express();

app.set('trust proxy', 1);

const { DBHandler } = require("./db");
const { RouteHandler } = require("./routers");

app.use(express.json());

const connectDb = async () => {
  try {
    return DBHandler.init({
      driver: process.env.MONGODB_DRIVER || "",
      username: process.env.MONGODB_USERNAME || "",
      password: process.env.MONGODB_PASSWORD || "",
      database: process.env.MONGODB_DATABASE || "",
    });
  } catch (error) {
    console.error("Error while connecting to the database: ", error);
    return false;
  }
};

(async () => {

  const isConnectedDb = await connectDb();
  if (!isConnectedDb.pass) {
    console.log("Unable to connect to mongodb, check console.");
  } else {
    const { router: middlewareRouter } = await RouteHandler.getMiddlewareRoutes(
      isConnectedDb.data.url
    );
    app.use(middlewareRouter);

    const apiRouter = await RouteHandler.getApiRoutes();
    app.use(apiRouter);

    console.log("Connected mongo.");
  }
})();

//--------------------deployment--------------------

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
} 

//--------------------deployment--------------------

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
