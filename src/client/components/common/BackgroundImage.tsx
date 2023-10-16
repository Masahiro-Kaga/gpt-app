import React from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const backgroundStyles = (backgroundImageUrl: string) => css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url("${backgroundImageUrl}") no-repeat center center / cover;
`;

interface BackgroundProps {
  url: string;
  classOption?: string;
}

const BackgroundImage: React.FC<BackgroundProps> = ({ url,classOption }) => {
  return <div css={backgroundStyles(url)} className={classOption} />;
};

export default BackgroundImage;
