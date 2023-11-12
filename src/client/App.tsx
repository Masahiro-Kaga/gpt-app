import { useEffect } from "react";
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import { implementAxiosInterceptor } from "./axiosConfig";
import { fetchLatestSessionData, setCurrentPath } from "./store/slice";
import store, { AppDispatch } from "./store/store";

import ContentsPage from "./pages/ContentsPage";
import Header from "./components/common/Header";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

const App:React.FC = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  // Because of Strict Mode, this useEffect is called twice. Thus, clean up function is needed.
  useEffect(() => { return implementAxiosInterceptor(navigate, dispatch, store) }, []);
  // Apart from Error Page, fetch latest session data when the path is changed.
  useEffect(() => { !location.pathname.includes("error") && dispatch(fetchLatestSessionData())}, [location.pathname]);
  // Due to the axios configuration to navigate the user to the error page when the user is not authenticated,
  useEffect(() => { dispatch(setCurrentPath({location:location.pathname})),[location.pathname]}); 

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route
        path="/contents"
        element={
          <>
            <Header />
            <Outlet />
          </>
        }
      >
        <Route path=":subPage" element={<ContentsPage />} />
      </Route>
      <Route path="/error/:errorCode" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
