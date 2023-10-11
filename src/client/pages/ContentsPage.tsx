import React, { useState, useEffect } from "react";
import ImageGenerator from "../components/ImageGeneration/ImageGenerator";
import GptHandler from "../components/GptHandle/GptHandler";
import BackgroundImage from "../components/common/BackgroundImage";
import { useLocation } from "react-router-dom";
import { Slide } from "@mui/material";
import Header from "../components/common/Header";
import MainShowWindow from "../components/common/MainShowWindow";

const ContentsPage: React.FC = () => {
  const location = useLocation();
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    setKey(Math.random()); // ロケーションが変わるたびに新しいキーを生成
  }, [location]);

  let CurrentPage;

  switch (location.pathname) {
    case "/contents/image-generation":
      CurrentPage = ImageGenerator;
      break;
    case "/contents/gpt-handler":
      CurrentPage = GptHandler;
      break;
    default:
      CurrentPage = ImageGenerator;
  }

  return (
    <>
      <BackgroundImage url="/images/background-images/error-bg.jpeg" />
      <Slide key={key} direction="right" in={true} timeout={1000} mountOnEnter unmountOnExit>
          <div>
        <MainShowWindow>
          <CurrentPage />
        </MainShowWindow>
          </div>
      </Slide>
    </>
  );
};

export default ContentsPage;
