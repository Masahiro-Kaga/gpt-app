const cors = require( 'cors');
const path = require( 'path');
const fs = require( 'fs');
const express = require( 'express');
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
	static getMiddlewareRoutes() {
		const router = express.Router();

		if (process.env.NODE_ENV === "production") {
			router.set('trust proxy', 1); // trust first proxy
		}

		const origin = [];
		if (process.env.NODE_ENV === "development") {
			origin.push(`http://localhost:${REACT_APP_CLIENT_PORT}`);
		} else {
			origin.push(`http://localhost:${REACT_APP_SERVER_PORT}`);
			origin.push(process.env.REACT_APP_URL);
		}

        const corsSettings = { origin };
		corsSettings.credentials = true;

        router.use( cors( corsSettings ) );
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