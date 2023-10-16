import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import chalk from 'chalk';

const Collections = {};


/**
 * Static class for connecting to DB and making calls.
 */
export class DBHandler {
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
  static async init( args ) {
    const driver = args.driver;
    const username = args.username;
    const password = args.password;;

    const { database, url } = (()=>{
      if(!process.env.DOCKER_ENV){
        const databaseName = args.database.replace('mongo','localhost').split('/')[0] + '/dev';
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



    
                        
        
        console.log("url???");
    console.log(url);

    try {
      await mongoose.connect(url);
      colorLog(
        "green",
        `\nSuccessfully connected to DB ${database} as user: ${username}\n`
      );
      return { pass: true , data: {url}};
    } catch (err) {
      console.log(err)
      colorLog(
        "red",
        `\nCould not connect to DB ${database} as user: ${username}\n`
      );
      return { pass: false , data: "Cannot connect Mongodb: " + err.message};
    }
  }

  /**
	 * Grab single / first document corresponding to the table and find params.
	 *
	 * @param args An object of arguments.
   * @param args.model The model schema to reference.
	 * @param args.criteria Criteria object to filter documents fetched.
	 * @returns Whether the query passed and relating data.
	 */
  static async getDocument(args) {
    const {
      model, criteria, fields = {}, populate = '', session = false,
    } = args;
    try {
      const doc = await Collections[model]
        .findOne(criteria, fields)
        .populate(populate)
        .session(session);
      return { pass: !!doc, data: doc || `Failed to find ${model} document.` };
    } catch (error) {
      if(error instanceof Error){
      console.log(error)
      return {pass: false, data: error.message};
    }
  }
}
}

/**
 * Display a console log output in a specified color.
 *
 * @param {string} color 	The color to display in.
 * @param {(number | string | Array | object)} value	The value to output.
 */

function colorLog(
  color,
  value
) {
  const colors = {
    green: chalk.green,
    red: chalk.red,
    orange: chalk.magenta,
    cyan: chalk.cyan,
    blue: chalk.blue
  }

  console.log(colors[color](value));

          
      
      
      
      
      
    }
