const mongoose = require("mongoose");
const chalk = require("chalk");

/**
 * Static class for connecting to DB and making calls.
 */
class DBHandler {
  /**
   * Initialize the mongoose connection and enable for Promises.
   *
   * @param {object} 	args			      An object of arguments.
   * @param {string} 	args.driver		  The connection string to the mongodb driver.
   * @param {string} 	args.username	　The username for the mongo database user.
   * @param {object} 	args.password 	The password for the mongo database user.
   * @param {object} 	args.database 	The database name to connect to.
   * @returns {boolean} Whether the connection passed or not.
   */
  static async init(args) {
    const driver = args.driver;
    const username = args.username;
    const password = args.password;

    const { database, url } = (() => {
      if (!process.env.DOCKER_ENV) {

        // const databaseName =
        //   args.database.replace("mongo", "localhost").split("/")[0] + "/dev";
        // return {
        //   database: databaseName,
        //   url: `${driver}${databaseName}`,
        // };
        return {
          database: "DeployTestEC2",
          url: process.env.MONGODB_ATLAS,
        };
      } else {
        return {
          database: args.database,
          url: `${driver}${username}:${password}@${args.database}`,
        };
      }
    })();

    try {
      await mongoose.connect(url);
      colorLog(
        "green",
        `\nSuccessfully connected to DB ${database} as user: ${username}\n`
      );
      return { pass: true, data: { url } };
    } catch (err) {
      console.log(err);
      colorLog(
        "red",
        `\nCould not connect to DB ${database} as user: ${username}\n`
      );
      return { pass: false, data: "Cannot connect Mongodb: " + err.message };
    }
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

module.exports = { DBHandler };