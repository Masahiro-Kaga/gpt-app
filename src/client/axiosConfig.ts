import axios from "axios";
import { NavigateFunction } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// Frontだと、REACT_APP_を先につけないとenv変数が使えない、はずだが、たまに使えたりする。意味ふめい。実際にNODE_ENVは使えてる。
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = `${process.env.REACT_APP_URL}:${
    process.env.REACT_APP_SERVER_PORT || 8000
  }/`;
  axios.defaults.withCredentials = true; // Allows for CORS cookies.
}

axios.defaults.timeout = 2000; // 2秒のタイムアウトを設定

export interface APIGeneralResponseType {
  pass: boolean;
  data: string;
}

export const testStringDIF = "testStringDIF";

// export const get = async (path: string): Promise<APIGeneralResponseType> => {
//   const response:APIGeneralResponseType = await axios.get<APIGeneralResponseType>(path);
//   return response; // このデータは {pass: boolean, data: string} の形式になっていると期待しています。
// }

// Any status code that lie within the range of 2xx cause this function to trigger.
// export const setupResponseInterceptor = (navigate: NavigateFunction) => {
//   axios.interceptors.response.use(
//     (response) => {
//       console.log(response.data); // ここでレスポンスデータをログに出力
//       return response.data;
//     },
//     (error) => {
//       // const navigate = useNavigate();
//       // const dispatch = useDispatch();
//       console.log("Axios error???");
//       console.log(error);
//       if (error.code === "ECONNABORTED") {
//         return { pass: false, data: "Request timed out, No response." };
//       }

//       switch (error.response.status) {
//         case 500:
//           navigate("/error/500");
//           break;

//         case 440:
//           console.log(
//             error.request,
//             "Session Expired. Logging out and redirecting to 440 page."
//           );
//           // dispatch(logout());
//           // dispatch(setUser(null));
//           // navigate(`/error/${error.response.status}`);
//           break;

//         case 404:
//           // navigate(`/error/${error.response.status}`);
//           break;

//         case 403:
//           // navigate(`/error/${error.response.status}`);
//           break;

//         case 401:
//           // navigate(`/error/${error.response.status}`);
//           break;

//         default:
//           console.log(`Unhandled server response ${error.response.status}`);
//       }
//       return { pass: false, data: error.response.data };
//     }
//   );
// };

// // Any status code that lie within the range of 2xx cause this function to trigger.
// 	axios.interceptors.response.use(
//     (response) => response.data,
//     (error) => {
//       // const navigate = useNavigate();
//       // const dispatch = useDispatch();
//       console.log("Axios error???");
//       console.log(error);
//       if (error.code === "ECONNABORTED") {
//         return { pass: false, data: "Request timed out, No response." };
//       }

//       switch (error.response.status) {
//         case 500:
//           // navigate('/error/500');
//           break;

//         case 440:
//           console.log(
//             error.request,
//             "Session Expired. Logging out and redirecting to 440 page."
//           );
//           // dispatch(logout());
//           // dispatch(setUser(null));
//           // navigate(`/error/${error.response.status}`);
//           break;

//         case 404:
//           // navigate(`/error/${error.response.status}`);
//           break;

//         case 403:
//           // navigate(`/error/${error.response.status}`);
//           break;

//         case 401:
//           // navigate(`/error/${error.response.status}`);
//           break;

//         default:
//           console.log(`Unhandled server response ${error.response.status}`);
//       }
//       return { pass: false, data: error.response.data };
//     }
//   );
