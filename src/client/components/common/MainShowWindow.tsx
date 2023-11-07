import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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
    <div className="flex px-2 sm:px-6 py-2" css={containerStyles}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "rgba(255,255,255,0.8)",
          height: `calc(100dvh - ${option.headerHeight}px - 20px)`,
          // padding: { xs: "10px", sm: "20px" },
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
