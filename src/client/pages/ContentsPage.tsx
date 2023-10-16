import React, { useState, useEffect } from "react";
import ImageGenerator from "../components/ImageGeneration/ImageGenerator";
import GptHandler from "../components/GptHandle/GptHandler";
import BackgroundImage from "../components/common/BackgroundImage";
import { useLocation } from "react-router-dom";
import { Slide } from "@mui/material";
import Header from "../components/common/Header";
import MainShowWindow from "../components/common/MainShowWindow";
import AudioScriptor from "../components/AudioScript/AudioScriptor";

const ContentsPage: React.FC = () => {
  const location = useLocation();
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    setKey(Math.random());   }, [location]);

  let CurrentPage;

  switch (location.pathname) {
    case "/contents/image-generation":
      CurrentPage = ImageGenerator;
      break;
    case "/contents/gpt-handler":
      CurrentPage = GptHandler;
      break;
    case "/contents/audio-script":
      CurrentPage = AudioScriptor;
      break;
    default:
      CurrentPage = ImageGenerator;
  }

  return (
    <>
      <BackgroundImage url="/images/background-images/contents-image.jpeg" classOption="opacity-80 brightness-50 grayscale" />
      <Slide key={key} direction="up" in={true} timeout={500} mountOnEnter unmountOnExit>
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
