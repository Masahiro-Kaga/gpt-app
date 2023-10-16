import axios from "axios";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = `${process.env.REACT_APP_URL}:${
    process.env.REACT_APP_SERVER_PORT || 8000
  }/`;
  axios.defaults.withCredentials = true; // Allows for CORS cookies.
}

axios.defaults.timeout = 2000;

export interface APIGeneralResponseType {
  pass: boolean;
  data: string;
}