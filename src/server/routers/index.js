import cors from  'cors';
import path from  'path';
import fs from  'fs';
import express from  'express';
import cookieParser from  'cookie-parser';
import mongoose from  'mongoose';
import session from  'express-session';
import MongoStore from 'connect-mongo'
// import helmet from  'helmet';

/**
 * Static class for updating different routing components.
 */
export class RouteHandler {
	/**
	 * Grab all middleware route configs.
	 *
	 * @returns {object} Express router object.
	 */
	static getMiddlewareRoutes(connectDbUrl) {
		const router = express.Router();
		let sessionMiddleware = null;

        // Allow CORS from same origin.
		const origin = [];
        process.env.NODE_ENV === 'development' && origin.push( `${process.env.REACT_APP_URL}:${process.env.REACT_APP_CLIENT_PORT || 3000}` );
        const corsSettings = { origin };
        process.env.NODE_ENV === 'development' && ( corsSettings.credentials = true ); // Access-Control-Allow-Credentials when axios sent withCredentials.

        router.use( cors( corsSettings ) );
		router.use( cookieParser() );

		if ( mongoose !== undefined && mongoose.connection !== undefined ) {
			sessionMiddleware = session( {
				secret: process.env.SESSION_SECRET,
				resave: false,
				rolling: true,
				saveUninitialized: false,

				cookie: {
                    secure:false,
                    httpOnly:true,
					maxAge: +( process.env.SESSION_TIMEOUT || 4 * 60 * 60 * 1000 ),
				},
                store: MongoStore.create({
                    mongoUrl: connectDbUrl
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
            const importedModule = await import(`./${type}/${r}`);
            router.use(`/${type}/${endpoint}`, importedModule.default); // ここで .default を使っていることに注意
            } catch (error) {
              console.error(`Error importing module: ./${type}/${r}`, error);
            }
          }
        }

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

