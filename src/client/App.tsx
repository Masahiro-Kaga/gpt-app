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
// import { ContentsRouteType } from "./constants";
import axios from "axios";
// import { setupResponseInterceptor } from "./axiosConfig";
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

  // Any status code that lie within the range of 2xx cause this function to trigger.
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        ; // ここでレスポンスデータをログに出力
        ; // ここでレスポンスデータをログに出力
        return response.data;
      },
      (error) => {
        // const navigate = useNavigate();
        // const dispatch = useDispatch();
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
            // dispatch(setUser(null));
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
            // navigate(`/error/${error.response.status}`);
            break;

          case 401:
            // navigate(`/error/${error.response.status}`);
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
    // こうしないとasync/await設定不可らしい。useEffect(async　はエラー。
    const fetchData = async () => {
      try {
        const response: APIGeneralResponseType = await axios.get(
          "/api/user/check-session"
        );
        ;
        ;
        ;
        if (response.pass === null) return; // APIの結果を待つ
        // if (!response.pass) {
        //   ;
        //   navigate("/");
        //   return;
        // }
        if (response.pass === true) {
          dispatch(fetchSession({ username: response.data }));
        }
      } catch (error) {
        //また、throwを使用するかどうかについては、createAsyncThunk内でエラーをキャッチしてReduxのrejectedアクションをディスパッチするために必要です。インターセプターでエラー処理を完結させる場合、createAsyncThunkでのthrowは必要ありません。 だそうです。
        throw error; // これが、fetchLatestSessionData.rejectedを働かせる。
      }
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

// Open AIのAPIを使って、ウェブアプリを作成中です。次の条件で素敵なバックグラウンドイメージとヘッダー、フッター、サイドバーのイメージを作ってください。
// ・老若男女ともにウケそうなもの。
// ・全体的に、近代的なイメージ。
// ・ロボットっぽいイラストが入っているもの。
// ・ヘッダーには、Image generator, Sound catcher, Chat Answerのタブがあり、ログインの項目もある。
// ・ヘッダーの左には、アプリの名前が入っている。アプリの名前も考えてください（英語で）。
// ・とりあえず、image-generatorのページのimageをバックグラウンド画像として作成してください。Sound catcher, Chat Answerに関しては、後でお願いします。
// ・フッターはヘッダーに合わせて、かっこいい感じにしてください。
// ・サイドバーも同じく。
