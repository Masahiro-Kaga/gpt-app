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
