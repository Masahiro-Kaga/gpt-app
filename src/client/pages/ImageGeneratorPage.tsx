
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import ImageGenerator from "../components/ImageGeneration/ImageGenerator";
import SideSettingDrawer from "../components/common/SideSettingDrawer";

const ImageGeneratorPage = () => {
  // const container = css`
  //   background: url("/images/background-images/imageGenerator-bg.jpeg")
  //     no-repeat center center / cover;
  // `;

  const conatinerStyles = css`
    position: relative;
  `;

  const backgroundStyles = css`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url("/images/background-images/imageGenerator-bg.jpeg")
      no-repeat center center / cover;
  `;

  return (
    <div css={conatinerStyles}>
      <div css={backgroundStyles}></div>
      <ImageGenerator></ImageGenerator>
      <SideSettingDrawer></SideSettingDrawer>
    </div>
  );
};

export default ImageGeneratorPage;
