import mongoose from "mongoose";
// mongoose.set( 'debug', true ); // turn on debug
import fs from "fs";
import path from "path";
import chalk from 'chalk';

const Collections = {};

interface initProps {
  driver: string;
  username: string;
  password: string;
  database: string;
}

// Ver 6.0から標準でこの設定。型定義セットも既に存在しないのでエラー出る。
// const mongooseConfig = {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false,
// };

/**
 * Static class for connecting to DB and making calls.
 */
class DBHandler {
  /**
   * Initialize the mongoose connection and enable for Promises.
   *
   * @param {object} 	args			An object of arguments.
   * @param {string} 	args.driver		The connection string to the mongodb driver.
   * @param {string} 	args.username	　The username for the mongo database user.
   * @param {object} 	args.password 	The password for the mongo database user.
   * @param {object} 	args.database 	The database name to connect to.
   * @returns {boolean} Whether the connection passed or not.
   */
  static async init(args: initProps): Promise<boolean> {
    const driver = args.driver;
    const username = args.username;
    const password = args.password;;

    const { database, url } = (()=>{
      if(!process.env.DOCKER_ENV){
        const databaseName = args.database.replace('mongo','localhost').split('/')[0] + '/';
        return {
          database: databaseName,
          url: `${driver}${databaseName}`,
        };
      }else{
        return {
          database: args.database,
          url:`${driver}${username}:${password}@${args.database}`,
        }
      }
    })();

    // const database = !process.env.DOCKER_ENV ? args.database.replace('mongo','localhost').split('/')[0] + '/' : args.database ;

    // let url;
    // if(!process.env.DOCKER_ENV){
    //   url = `${driver}${username}:${password}@${database}`;
    // }else{
    //   url = `${driver}${database}`
    // }

    // const url = `${driver}${username}:${password}@${database}`;
    // const url = "mongodb://localhost:27017/dev?authMechanism=DEFAULT&authSource=admin&directConnection=true";

    // mongoose.Promise = global.Promise;
    console.log("url???");
    console.log(url);

    try {
      await mongoose.connect(url);
      colorLog(
        "green",
        `\nSuccessfully connected to DB ${database} as user: ${username}\n`
      );
      return true;
    } catch (err) {
      console.log(err)
      colorLog(
        "red",
        `\nCould not connect to DB ${database} as user: ${username}\n`
      );
      return false;
    }
  }
}

// type ColorType = 'green' | 'red' | 'orange' | 'cyan' | 'blue';

/**
 * Display a console log output in a specified color.
 *
 * @param {string} color 	The color to display in.
 * @param {(number | string | Array | object)} value	The value to output.
 */
// function colorLog( color: ColorType | string, value: number | string | any[] | object): void {
type ColorType = 'green' | 'red' | 'orange' | 'cyan' | 'blue';


function colorLog(
  color: ColorType,
  value: number | string | any[] | object
): void {
  const colors = {
    green: chalk.green,
    red: chalk.red,
    orange: chalk.magenta,
    cyan: chalk.cyan,
    blue: chalk.blue
  }

  console.log(colors[color](value));

  // alias.
  // switch (color) {
  //   case "green":
  //     color = "\x1b[32m";
  //     break;

  //   case "red":
  //     color = "\x1b[31m";
  //     break;

  //   case "orange":
  //     color = "\x1b[35m";
  //     break;

  //   case "cyan":
  //     color = "\x1b[36m";
  //     break;

  //   case "blue":
  //     color = "\x1b[34m";
  //     break;

  //   default:
  //     color = "\x1b[0m";
  // }

  // console.log(color + value); // display with color.
  // console.log(color + value + "\x1b[0m"); // reset.
}

export default DBHandler;