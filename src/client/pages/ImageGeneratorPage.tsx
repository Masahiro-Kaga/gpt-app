import { useState } from "react";
import ImageGenerator from "../components/ImageGeneration/ImageGenerator";
import BackgroundImage from "../components/common/BackgroundImage";

const ImageGeneratorPage: React.FC = () => {
  return (
    <>
      <BackgroundImage url="/images/background-images/dashboard-bg.jpeg" />
        <ImageGenerator></ImageGenerator>
    </>
  );
};

export default ImageGeneratorPage;
