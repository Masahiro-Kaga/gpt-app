import axios from 'axios';

// Frontだと、REACT_APP_を先につけないとenv変数が使えない、はずだが、たまに使えたりする。意味ふめい。実際にNODE_ENVは使えてる。
if ( process.env.NODE_ENV === 'development' ) {
	console.log(process.env.REACT_APP_NODE_ENV)
	console.log(process.env.REACT_APP_URL)
	console.log(process.env.REACT_APP_SERVER_PORT)
	axios.defaults.baseURL = `${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT || 8000}/`;
	axios.defaults.withCredentials = true; // Allows for CORS cookies.
}

// Any status code that lie within the range of 2xx cause this function to trigger.
axios.interceptors.response.use( response => response.data,
	// Any status codes that falls outside the range of 2xx cause this function to trigger.
	( error ) => {
		console.log(error);
		switch ( error.response.status ) {
		// Internal Server Error.
		case 500:
			console.log( 'Internal Server Error. redirecting to 500 page.' );
			// router.push( '/error/500', () => {} );
			break;

		// Session expired.
		case 440:
			console.log( error.request, 'Session Expired. Logging out and redirecting to 440 page.' );
			// router.push( '/error/440', () => {} );
			// !!store.state.user === true && store.dispatch( 'logout' );
			// store.commit( 'setUser', null );
			break;

		// Page Not Found.
		case 404:
			console.log( 'Page Not Found. Redirecting to 404 page.' );
			// router.push( '/error/404', () => {} );
			break;

		// Forbidden.
		case 403:
			console.log( 'Forbidden. Redirecting to 403 page.' );
			// router.push( '/error/403', () => {} );
			break;

		// Unauthorized.
		case 401:
			console.log( 'Unauthorized. Redirecting to 401 page.' );
			// router.push( '/error/401', () => {} );
			break;
		default:
			console.log( `Unhandled server response ${error.response.status}` );
		}
		return { pass: false, data: error.response.data };
	} );
