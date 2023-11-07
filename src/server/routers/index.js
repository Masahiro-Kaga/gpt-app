const cors = require( 'cors');
const path = require( 'path');
const fs = require( 'fs');
const express = require( 'express');
const cookieParser = require( 'cookie-parser');
const mongoose = require( 'mongoose');
const session = require( 'express-session');
const MongoStore = require('connect-mongo')
// const helmet = require( 'helmet');

/**
 * Static class for updating different routing components.
 */
class RouteHandler {
	/**
	 * Grab all middleware route configs.
	 *
	 * @returns {object} Express router object.
	 */
	static getMiddlewareRoutes(connectDbUrl) {
		const router = express.Router();
		let sessionMiddleware = null;

		// if (process.env.NODE_ENV === "production") {
		// 	router.set('trust proxy', 1); // trust first proxy
		// }

        // Allow CORS = require(same origin.
		// const origin = [];
        // process.env.NODE_ENV === 'development' && origin.push( `${process.env.REACT_APP_URL}:${process.env.REACT_APP_CLIENT_PORT || 3000}` );
		const origin = ["http://localhost:8000","http://localhost:3000", "https://mkportfolio.link"];

        const corsSettings = { origin };
        // process.env.NODE_ENV === 'development' && ( corsSettings.credentials = true ); // Access-Control-Allow-Credentials when axios sent withCredentials.
		corsSettings.credentials = true;

        router.use( cors( corsSettings ) );
		router.use( cookieParser() );

		if ( mongoose !== undefined && mongoose.connection !== undefined ) {
			sessionMiddleware = session( {
				sameSite: 'lax',
				secret: process.env.SESSION_SECRET,
				resave: false,
				rolling: true,
				saveUninitialized: false,

				cookie: {
					secure:process.env.NODE_ENV === "production" ? true : false,
                    httpOnly:true,
					maxAge: +( process.env.SESSION_TIMEOUT || 4 * 60 * 60 * 1000 ),
				},
				proxy: true,
                store: MongoStore.create({
                    mongoUrl: connectDbUrl,
					autoRemove: 'interval',
					autoRemoveInterval: 10
				  
                })
			} );
			router.use( sessionMiddleware );
		}

		return {
			router,
			sessionMiddleware,
		};
	}

	/**
	 * Grab all api routes in /routes.
	 *
	 * @param {Function|boolean} apiRateLimitMiddleware Optional function to handle API rate limits on all API endpoints.
	 * @returns {object} Express router object.
	 */
    static async getApiRoutes(apiRateLimitMiddleware = false) {
        const router = express.Router();
      
        const apiTypes = ['api'];
      
        // Register both /api and /migrate endpoints.
        for (const type of apiTypes) {
          const apiDir = fs.readdirSync(path.join(__dirname, `./${type}`));
          for (const r of apiDir) {
            if (r === 'utilities') continue;
      
            const endpoint = r.replace('.js', '');
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

		router.use( ( err, req, res, next ) => {
			if ( err && err.error && err.error.isJoi ) {
				// we had a joi error, let's return a custom 400 json response
				res.json( {
					pass: false,
					data: 'Validation errors please see details.',
					errors: err.error.details.map( d => d.message ),
				} );
			} else {
				// pass on to another error handler
				next( err );
			}
		} );

		router.use((req,res) => {
			res.status(404).json({path:false, data:`Endpoint ${req.url} not found.`})
		  })    
	  
		return router;
	}
}

module.exports = { RouteHandler };