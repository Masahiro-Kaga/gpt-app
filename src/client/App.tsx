import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import GptHandlerPage from "./pages/GptHandlerPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/LoginPage";
import MainShowWindow from "./components/common/MainShowWindow";
import { useCheckSession } from "./hooks/useCheckSession";
import { APIGeneralResponseType } from "./axiosConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "./store/slice";
import { RootState } from "./store/store";

interface MainContentsProps {
  pass: boolean | null;
}

function MainContents({pass}:MainContentsProps) {
  console.log("are you there");
  useCheckSession(pass);

  return (
    <>
      <Header />
      <MainShowWindow>
        <Outlet />
      </MainShowWindow>
      {/* <Footer /> */}
    </>
  );
}

function App() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=>state.userKey)

  const [pass,setPass] = useState<boolean | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: APIGeneralResponseType = await axios.get(
          "/api/user/check-session"
        );
        setPass(response.pass);
        if (!response.pass) {
          
          return;
        }
        dispatch(fetchSession( { username:response.data } ))
        return response;
      } catch (error) {
        //また、throwを使用するかどうかについては、createAsyncThunk内でエラーをキャッチしてReduxのrejectedアクションをディスパッチするために必要です。インターセプターでエラー処理を完結させる場合、createAsyncThunkでのthrowは必要ありません。 だそうです。
        throw error; // これが、fetchLatestSessionData.rejectedを働かせる。
      }
    };
    fetchData();
  }, [user.isSessionActive])
  
  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/contents" element={<MainContents pass={pass} />}>
          <Route path="image-generation" element={<ImageGeneratorPage />} />
          <Route path="gpt-handler" element={<GptHandlerPage />} />
        </Route>
      </Routes>
    </Router>
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
