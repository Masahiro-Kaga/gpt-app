/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React, { ReactNode } from "react";

const containerStyles = css`
  position: relative;
`;

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
  children: ReactNode;
}

const BackgroundImage: React.FC<BackgroundProps> = ({ url, children }) => {
  return (
    <div css={containerStyles}>
      <div css={backgroundStyles(url)} />
      {children}
    </div>
  );
};

export default BackgroundImage;
