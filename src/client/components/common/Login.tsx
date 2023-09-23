/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import ServiceButton from "./ServiceButton";

const commonContainerStyles = css`
  flex: 1;
  display: flex;
  justify-content: center; /* Center the content */
  margin: 0 5%;
  max-width: 400px;
`;

const loginContainer = css`
  ${commonContainerStyles};
  background-color: rgba(0, 0, 0, 0.6);

`;

const descriptionContainer = css`
  ${commonContainerStyles};
  flex-direction:column;
  gap: 10px 0px;
`;

const Login: React.FC = () => {
  return (
    <div className="flex flex-col justify-around w-full md:flex-row md:h-screen items-center">
      <div css={loginContainer}>
        <Button>create</Button>
      </div>
      <div css={descriptionContainer}>
        <img src="/images/logo.png"></img>
        <ServiceButton to="/image-generation" backgroundColor="rgb(230, 77, 92)" disabled={false} title="Image Generator" ></ServiceButton>
        <ServiceButton to="/gpt-handler" backgroundColor="rgb(0, 198, 181)" disabled={false} title="GPT Handler" ></ServiceButton>
      </div>
    </div>
  );
};

export default Login;
