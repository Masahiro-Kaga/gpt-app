/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { RootState } from "../../store/store";
import { useSelector } from 'react-redux';

interface MainShowWindowProps {
  children: ReactNode;
}

const containerStyles = css`
    background-color: white;
    margin :20px ;
    border-radius: 20px;
`

const MainShowWindow: React.FC<MainShowWindowProps> = ({ children }) => {

  const option = useSelector((state:RootState)=>state.optionKey)

  return (
    <div css={containerStyles}>
      {children}
      {option.headerHeight}
    </div>
  );
}

export default MainShowWindow;
