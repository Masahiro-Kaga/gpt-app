import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import GptHandlePage from "./pages/GptHandlePage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/image-generation" Component={ImageGeneratorPage} />
        <Route path="/gpt-handler" Component={GptHandlePage} />
      </Routes>
      <Footer></Footer>
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