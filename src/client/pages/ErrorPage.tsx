/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackgroundImage from "../components/common/BackgroundImage";
import { Slide,Fade, Button } from "@mui/material";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const errorContainerStyle = css`
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  align-self: flex-start;
`;

const messageStyle = css`
  font-size: 16px;
  margin-bottom: 10px;
  align-self: center;
`;

const ErrorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params: any = useParams();
  const [key, setKey] = useState(Math.random());

  const user = useSelector((state: RootState) => state.userKey);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setKey(Math.random());
  }, [location]);

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <>
      <BackgroundImage url="/images/background-images/error-bg.gif" classOption="opacity-80 brightness-50 grayscale"/>
      <Fade
        key={key}
        // direction="right"
        in={true}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <div className="flex items-center justify-center h-screen">
          <div css={errorContainerStyle}>
            <div css={titleStyle}>{params.errorCode}</div>
            <div>
              {params.errorCode === "440" && (
                <p css={messageStyle}>Session Expired, Please login.</p>
              )}
            </div>
            {params.errorCode === "440" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </Fade>
    </>
  );
};

export default ErrorPage;
