import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Fade, Button } from "@mui/material";

import BackgroundImage from "../components/common/BackgroundImage";
import { AppDispatch, RootState } from "../store/store";
import { setHttpError } from "../store/slice";

const ErrorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const [key, setKey] = useState(Math.random());

  const httpStatus = useSelector((state: RootState) => state.httpErrorKey);
  const errorCode = params.errorCode || 404;
  const httpError = httpStatus.httpError || "Page Not Found";

  useEffect(() => {
    setKey(Math.random());
  }, [location]);

  useEffect(() => {
    // Clean up function: reset httpError to empty string when the user leaves the page.
    return () => {
      dispatch(setHttpError({ httpError: "" }));
    };
  }, []);

  const redirectRootPageHandler = () => {
    navigate("/");
  };

  return (
    <>
      <BackgroundImage
        url="/images/background-images/error-bg.gif"
        classOption="opacity-80 brightness-50 grayscale"
      />
      <Fade key={key} in={true} timeout={1000} mountOnEnter unmountOnExit>
        <div className="flex items-center justify-center h-screen">
          <div css={errorContainerStyle}>
            <div css={titleStyle}>Error: {errorCode}</div>
            <div>
              <p css={messageStyle}>{httpError}</p>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={redirectRootPageHandler}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </Fade>
    </>
  );
};

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
  align-self: flex-center;
`;

const messageStyle = css`
  font-size: 16px;
  margin-bottom: 10px;
  align-self: center;
`;

export default ErrorPage;
