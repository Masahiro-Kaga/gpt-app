import { useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import GptHandlerPage from "./pages/GptHandlerPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/LoginPage";
import MainShowWindow from "./components/common/MainShowWindow";
import { useCheckSession } from "./hooks/useCheckSession";
import { APIGeneralResponseType } from "./axiosConfig";
import axios from "axios";
// import { setupResponseInterceptor } from "./axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "./store/slice";
import { RootState } from "./store/store";

console.log("First Render!");

function App() {
  const navigate = useNavigate();

  console.log("are you there");

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userKey);
  const location = useLocation();

  useEffect(() => {

    // こうしないとasync/await設定不可らしい。useEffect(async　はエラー。
    const fetchData = async () => {
      try {
        const response: APIGeneralResponseType = await axios.get(
          "/api/user/check-session"
        );
        if (response.pass === null) return; // APIの結果を待つ
        if (!response.pass) {
          console.log("useEffect to fetch session works");
          navigate("/");
          return;
        };
        dispatch(fetchSession({ username: response.data }));
      } catch (error) {
        //また、throwを使用するかどうかについては、createAsyncThunk内でエラーをキャッチしてReduxのrejectedアクションをディスパッチするために必要です。インターセプターでエラー処理を完結させる場合、createAsyncThunkでのthrowは必要ありません。 だそうです。
        throw error; // これが、fetchLatestSessionData.rejectedを働かせる。
      }
    };
    fetchData();
  }, [user.isSessionActive,location.pathname]);

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route
        path="/contents"
        element={
          <>
            <Header />
            <MainShowWindow>
              <Outlet />
            </MainShowWindow>
            {/* <Footer /> */}
          </>
        }
      >
        <Route path="image-generation" element={<ImageGeneratorPage />} />
        <Route path="gpt-handler" element={<GptHandlerPage />} />
      </Route>
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
