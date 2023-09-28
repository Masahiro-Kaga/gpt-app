import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "module-alias/register";

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

// TypeScriptはモジュールのインポートパスにテンプレートリテラルや変数を直接使用することを許可していないとのこと。
// 追加資料1：https://qiita.com/ryo2020/items/3346c4f0c9786b416b72#ext22-module-alias%E3%82%92%E4%BD%BF%E3%81%86
// 追加資料2：https://stackoverflow.com/questions/56650711/cannot-find-module-that-is-defined-in-tsconfig-paths
// const imageGeneratorRoute = require(`${global.routersDir}/imageGenerator`);
import imageGeneratorRoute from "@routers/imageGenerator/index";
import userRoute from "./routers/user";
import DBHandler from "./db";

app.use(cors());
app.use(express.json());

// TypeScript 3.7 以降、nullish coalescing operatorを使用してデフォルトの値を指定することができる。||とほぼ同じ効果。

const connectDb = async () => {
  try {
    return DBHandler.init({
      driver: process.env.MONGODB_DRIVER ?? "",
      username: process.env.MONGODB_USERNAME ?? "",
      password: process.env.MONGODB_PASSWORD ?? "",
      database: process.env.MONGODB_DATABASE ?? "",
    });
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    return false;
  }
};

(async () => {
  const isConnected = await connectDb();
  console.log("connected???");
  console.log(isConnected);

  if (!isConnected) {
    console.log("Unable to connect to mongodb, check console.");
  } else {
    console.log("Connected mongo.");
  }
})();

app.use("/imageGenerator", imageGeneratorRoute);
app.use("/user", userRoute);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
