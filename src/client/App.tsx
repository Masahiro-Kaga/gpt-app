import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import GptHandlerPage from "./pages/GptHandlerPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/LoginPage";
import MainShowWindow from "./components/common/MainShowWindow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const user = useSelector((state: RootState) => state.userKey);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <>
              <Header></Header>
              <MainShowWindow>
                <Outlet />
              </MainShowWindow>
            </>
          }
        >
          <Route
            path="image-generation"
            element={
              !user?.isSessionActive ? (
                <Navigate to="/" replace />
              ) : (
                <ImageGeneratorPage />
              )
            }
          />
          <Route
            path="gpt-handler"
            element={
              !user?.isSessionActive ? (
                <Navigate to="/" replace />
              ) : (
                <GptHandlerPage />
              )
            }
          />
        </Route>
      </Routes>
      {/* <Footer></Footer> */}
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
