import axios from "axios";

import { NavigateFunction } from "react-router-dom";
import { Dispatch, Store } from "redux";
import { deleteSession, setHttpError } from "./store/slice";

// Set the axios base URL depending on the environment.
if (process.env.NODE_ENV === "development") {
  // For development, construct the URL from the environment variables.
  axios.defaults.baseURL = `http://localhost:${process.env.REACT_APP_SERVER_PORT || 8000}/`;
} else if (process.env.NODE_ENV === "production") {
  // For production, use the specified URL.
  axios.defaults.baseURL = process.env.REACT_APP_URL;
}

// Enable credentials for CORS and set a request timeout.
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;

// This function sets up an axios response interceptor to handle API responses and errors.
export const implementAxiosInterceptor = (
  navigate: NavigateFunction,
  dispatch: Dispatch,
  store: Store,
) => {
  // Set up the interceptor to process responses or handle errors.
  const responseInterceptor = axios.interceptors.response.use(
    (response) => {
      // Return the response data directly for successful responses.
      return response.data;
    },
    (error) => {
      // The case the request was made and the server responded with a status code that falls out of the range of 2xx.
      if (error.response) {
        dispatch(
          setHttpError({
            httpError: error.response.data,
          })
        );

        // Different actions based on the HTTP status code from the error response.
        switch (error.response.status) {
          case 500: // Internal server error: navigate to a generic error page.
          case 429: // Too many requests: navigate to a generic error page.
          case 404: // Not found: navigate to a not found error page.
          case 403: // Forbidden: add handling for forbidden resources.

            // Server error: navigate to a generic error page.
            navigate(`/error/${error.response.status}`);
            break;

          case 401:
            // Unauthorized: handle unauthorized access.
            dispatch(deleteSession());
            const currentPath = store.getState().locationKey.location;
            if (currentPath !== "/") {
              navigate(`/error/${error.response.status}`);
            }
            break;

          default:
          // Default case for other types of errors.
        }
        // Return a standard error structure for any type of error.
        return { pass: false, data: error.response.data };

      // The case the request failed to reach the server, then an Error object is thrown.
      // Or, other API has no 'response' object.
      } else {
        switch(error.code){
          // Handle a timeout specifically with a custom message.
          case "ECONNABORTED":
            return { pass: false, data: "Request timed out, No response." };
          // Handle other network errors with a generic message.
          case "ERR_NETWORK":
            return { pass: false, data: "Network Error." };
          // Handle other errors with a generic message.
          default:
            return { pass: false, data: "Unknown Error." };
        }
      }
    }
  );

  // Return a cleanup function to eject the interceptor when it's no longer needed.
  return () => {
    axios.interceptors.response.eject(responseInterceptor);
  };
};

// Interface to type the general API response.
export interface APIGeneralResponseType {
  pass: boolean;
  data: string;
}
