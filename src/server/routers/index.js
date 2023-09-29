import cors from  'cors';
import path from  'path';
import fs from  'fs';
import express from  'express';
import cookieParser from  'cookie-parser';
import mongoose from  'mongoose';
import session from  'express-session';
// requireのバージョンはまた違う書き方なので注意。
import MongoStore from 'connect-mongo'

// import helmet from  'helmet';
// ( session );
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
		process.env.NODE_ENV === 'development' && origin.push( `${process.env.URL}:${process.env.CLIENT_PORT || 3000}` );
		const corsSettings = { origin };
		process.env.NODE_ENV === 'development' && ( corsSettings.credentials = true ); // Access-Control-Allow-Credentials when axios sent withCredentials.
		router.use( cors( corsSettings ) );

        console.log('corsSettings???');
        console.log(corsSettings);

		// Static Routes.
        
        // なんか、http://localhost:3000/images/logo2.pngでアクセスできるから、次のやつは特に必要ないみたい。てか静的ホスティングっていうみたい。
        // router.use( '/assets', express.static( "../../../public/images" ) );

		// Cookie Parser creates req.session in express-session.
		// const secure = process.env.URL.includes( 'https' );
		// router.use( express.json( { limit: '50mb' } ) );
		router.use( cookieParser() );
		if ( mongoose !== undefined && mongoose.connection !== undefined ) {
            console.log('connectDbUrl?????');
            console.log(connectDbUrl);
			sessionMiddleware = session( {
				secret: process.env.SESSION_SECRET,
				resave: false,
				rolling: true,
				saveUninitialized: false,
				cookie: {
					maxAge: +( process.env.SESSION_TIMEOUT || 4 * 60 * 60 * 1000 ),
				},
                // requireを使う時は下のとおりだと思う。https://stackoverflow.com/questions/66654037/mongo-connect-error-with-mongo-connectsession
				// store: new MongoStore( {
				// 	mongooseConnection: mongoose.connection,
				// } ),
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
}

