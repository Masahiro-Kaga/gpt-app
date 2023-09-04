/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import GptHandler from "../components/GptHandle/GptHandler";
import SideSettingDrawer from "../components/common/SideSettingDrawer";

const GptHandlePage = () => {
  const containerStyle = css`
    position:relative; 
  `
  const backgroundStyle = css`
    position:fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: black;
    background: url('/images/background-images/gptHandler_bg.jpeg') no-repeat center center / cover;
  `
  return (
    <div css={containerStyle}>
      <div css={backgroundStyle}></div>
      <GptHandler></GptHandler>
      <SideSettingDrawer></SideSettingDrawer>
    </div>
  )
}

export default GptHandlePage