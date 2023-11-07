import React from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
``
const backgroundStyles = (backgroundImageUrl: string) => css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url("${backgroundImageUrl}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: scroll;
`;

interface BackgroundProps {
  url: string;
  classOption?: string;
}

const BackgroundImage: React.FC<BackgroundProps> = ({ url, classOption }) => {
  return <div css={backgroundStyles(url)} className={classOption} />;
};

export default BackgroundImage;
