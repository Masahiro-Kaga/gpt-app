/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ReactNode } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

interface MainShowWindowProps {
  children: ReactNode;
}

const containerStyles = css`
    max-width: 1500px;
    margin: auto;
`;

const MainShowWindow: React.FC<MainShowWindowProps> = ({ children }) => {
  const option = useSelector((state: RootState) => state.optionKey);

  return (
    <div className="flex p-10 sm:p-6" css={containerStyles}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "rgba(255,255,255,0.8)",
          height: `calc(100vh - ${option.headerHeight}px - 40px)`,
          padding: { xs: "10px", sm: "20px" },
          width: "100%",
          borderRadius: "20px",
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default MainShowWindow;
