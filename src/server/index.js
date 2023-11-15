const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
require("module-alias/register");

global.globalDir = path.resolve(__dirname, "../..");
global.serverDir = path.resolve(__dirname);
global.routesDir = path.resolve(__dirname, "./routers");
global.modelsDir = path.resolve(__dirname, "./models");

dotenv.config();
const port = process.env.REACT_APP_SERVER_PORT;
const app = express();

const { DBHandler } = require("./db");
const { RouteHandler } = require("./routers");

app.use(express.json());

const connectDb = async () => {
  try {
    return DBHandler.init();
  } catch (error) {
    console.error("Error while connecting to the database: ", error);
    return false;
  }
};

(async () => {

  const isConnectedDb = await connectDb();
  if (!isConnectedDb) {
    console.log("Unable to connect to mongodb, check console.");
  } else {
    const middlewareRouter = await RouteHandler.getMiddlewareRoutes();
    app.use(middlewareRouter);
    const middlewareSession = await DBHandler.getMiddlewareSession();
    app.use(middlewareSession);
    const apiRouter = await RouteHandler.getApiRoutes();
    app.use(apiRouter);

    console.log("Connected mongo.");
  }
})();

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
