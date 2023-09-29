import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import "module-alias/register";

// requireとかimportする際、CommonJS（require）でしか、これは使えない。Ecma(import)じゃ無理ぽ。
// でも他では使える。
global.globalDir = path.resolve( __dirname, '../..' );
global.serverDir = path.resolve( __dirname );
global.routesDir = path.resolve( __dirname, './routes' );
global.modulesDir = path.resolve( __dirname, './modules' );

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

// TypeScriptはモジュールのインポートパスにテンプレートリテラルや変数を直接使用することを許可していないとのこと。
// 追加資料1：https://qiita.com/ryo2020/items/3346c4f0c9786b416b72#ext22-module-alias%E3%82%92%E4%BD%BF%E3%81%86
// 追加資料2：https://stackoverflow.com/questions/56650711/cannot-find-module-that-is-defined-in-tsconfig-paths
// const imageGeneratorRoute = require(`${global.routersDir}/imageGenerator`);

// jsconfig.json に書く,module-alias があるらしい。いまはtsやめたけど、なぜかtscofig.jsonが働いてくれてる。あとでなおす
// https://qiita.com/ryo2020/items/3346c4f0c9786b416b72

import imageGeneratorRoute from "@routers/imageGenerator/index";
import userRoute from "@routers/user/index";
// import になると、テンプレートリテラルはみとめられていない。
// import userRoute from `${global.routesDir}/user/index`;
// ただ、動的importなるもんもあるらしい。でもこれも面倒らしい。
// const userRoutePromise = import(`${global.routesDir}/user/index`);

// userRoutePromise.then(userRoute => {
//     // userRouteを使用する処理
// }).catch(err => {
//     console.error("モジュールのインポートに失敗しました:", err);
// });

// const userRoutePromise = import(`${global.routesDir}/user/index`);

import { DBHandler } from "./db";
import { RouteHandler } from "./routers";

app.use(cors());
app.use(express.json());

// TypeScript 3.7 以降、nullish coalescing operatorを使用してデフォルトの値を指定することができる。||とほぼ同じ効果。

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

const activateRoutes = async (url) =>{
  try {
    return RouteHandler.getMiddlewareRoutes(url);
  } catch (error) {
    console.error("Error while activating routers: ", error);
    return false;
  }
}

(async () => {
  const isConnectedDb = await connectDb();
  const isActivateRoutes = await activateRoutes(isConnectedDb.data.url);
  console.log("connected???");
  console.log(isConnectedDb);
  console.log("isActivateRoutes???");
  console.log(isActivateRoutes);
  

  if (!isConnectedDb.pass) {
    console.log("Unable to connect to mongodb, check console.");
  } else {
    console.log("Connected mongo.");
  }
})();

// app.use( express.static('/public') );

app.use("/imageGenerator", imageGeneratorRoute);
app.use("/user", userRoute);

console.log(globalDir);

// app.use( '/assets', express.static( `${global.globalDir}/public/images` ) );

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
