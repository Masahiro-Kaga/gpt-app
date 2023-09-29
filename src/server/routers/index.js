const cors = require( 'cors' );
const path = require( 'path' );
const fs = require( 'fs' );
const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const mongoose = require( 'mongoose' );
const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )( session );
const helmet = require( 'helmet' );

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
		let sessionMiddleware = null;

        // Allow CORS from same origin.
		const origin = [`${process.env.URL}:${process.env.PORT || 3000}`];
		process.env.NODE_ENV === 'development' && origin.push( `${process.env.URL}:${process.env.DOCKER_HOST_HMR_PORT || 6969}` ); // Cors from HMR server.
		const corsSettings = { origin };
		process.env.NODE_ENV === 'local' && ( corsSettings.credentials = true ); // Access-Control-Allow-Credentials when axios sent withCredentials for HMR server.
		router.use( cors( corsSettings ) );

		// Static Routes.
		router.use( '/assets', express.static( `${global.globalDir}/client/assets` ) );
		router.use( '/dist/client', express.static( path.join( global.globalDir, '../dist/client' ) ) );
		router.use( express.urlencoded( {
			extended: true,
			limit: '50mb',
		} ) );

		// Cookie Parser creates req.session in express-session.
		const secure = process.env.URL.includes( 'https' );
		router.use( express.json( { limit: '50mb' } ) );
		router.use( cookieParser() );
		if ( mongoose !== undefined && mongoose.connection !== undefined ) {
			sessionMiddleware = session( {
				secret: process.env.SESSION_SECRET,
				resave: false,
				rolling: true,
				saveUninitialized: false,
				cookie: {
					secure,
					maxAge: +( process.env.SESSION_TIMEOUT || 4 * 60 * 60 * 1000 ),
				},
				store: new MongoStore( {
					mongooseConnection: mongoose.connection,
				} ),
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
	static getApiRoutes( apiRateLimitMiddleware = false ) {
		const router = express.Router();

		const apiTypes = ['api'];

		// Register both /api and /migrate endpoints.
		apiTypes.forEach( ( type ) => {
			const apiDir = fs.readdirSync( path.join( __dirname, `./${type}` ) );
			apiDir.forEach( ( r ) => {
				if ( r === 'utilities' ) { return; }
				const endpoint = r.replace( '.js', '' );
				apiRateLimitMiddleware !== false && router.use( `/${type}/${endpoint}/`, apiRateLimitMiddleware );
				router.use( `/${type}/${endpoint}`, require( `./${type}/${r}` ) );
			} );
		} );

		// Handle JOI errors when passError = true.
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

		return router;
	}

	/**
	 * Grab all front-end / error middleware.
	 *
	 * @returns {object} Express router object.
	 */
	static getOtherRoutes() {
		const router = express.Router();

		// Every other non-mapped route.
		router.use( ( req, res ) => {
			res.sendFile( path.join( global.globalDir, '../dist/client/index.html' ) );
		} );

		// Handle error routes
		router.use( ( err, req, res, next ) => {
			console.log( `Error: ${err.message}` );
			next();
		} );

		return router;
	}
}

module.exports = RouteHandler;
