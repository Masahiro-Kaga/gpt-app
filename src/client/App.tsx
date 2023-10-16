import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ContentsPage from "./pages/ContentsPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/LoginPage";
import MainShowWindow from "./components/common/MainShowWindow";
import { useCheckSession } from "./hooks/useCheckSession";
import { APIGeneralResponseType } from "./axiosConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession, deleteSession } from "./store/slice";
import { RootState } from "./store/store";
import ErrorPage from "./pages/ErrorPage";

;

function App() {
  const navigate = useNavigate();
  ;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userKey);
  const location = useLocation();

    useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        ;         ;         return response.data;
      },
      (error) => {
                        ;
        ;
        if (error.code === "ECONNABORTED") {
          return { pass: false, data: "Request timed out, No response." };
        }

        switch (error.response.status) {
          case 500:
            navigate("/error/500");
            break;

          case 440:
            console.log(
              error.request,
              "Session Expired. Logging out and redirecting to 440 page."
            );
            dispatch(deleteSession());
                        ;
            ;
            if (location.pathname !== "/") {
              navigate(`/error/${error.response.status}`);
            }
            break;

          case 404:
            navigate(`/error/${error.response.status}`);
            break;

          case 403:
                        break;

          case 401:
                        break;

          default:
            ;
        }
        return { pass: false, data: error.response.data };
      }
    );
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  useEffect(() => {
        const fetchData = async () => {
      try {
        const response: APIGeneralResponseType = await axios.get(
          "/api/user/check-session"
        );
        ;
        ;
        ;
        if (response.pass === null) return;                                                 if (response.pass === true) {
          dispatch(fetchSession({ username: response.data }));
        }
      } catch (error) {
                throw error;       }
    };
    fetchData();
  }, [location.pathname]);

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route
        path="/contents"
        element={
          <>
            <Header />
            <Outlet />
            {/* <Footer /> */}
          </>
        }
      >
        <Route path=":subPage" element={<ContentsPage />} />
      </Route>
      <Route path="/error/:errorCode" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;

