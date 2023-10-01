/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import ServiceButton from "./ServiceButton";
import { useEffect, useState } from "react";
import moment from 'moment-timezone';
import axios from "axios";
import UserAuthButton from "./UserAuthButton";

const commonContainerStyles = css`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin: 0 5%;
  max-width: 400px;
`;

const loginContainer = css`
  ${commonContainerStyles};
  background-color: rgba(0, 0, 0, 0.6);
  gap: 20px;
  margin: 10px inherit;
  padding: 20px;
`;

const descriptionContainer = css`
  ${commonContainerStyles};
  flex-direction: column;
  gap: 10px 0px;
`;

interface UserProps {
  loginUsername: string;
}
interface InputFormProps {
  label: string;
  onChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ label, onChangeEvent }) => {
  return (
    <FormControl sx={{ margin: "5px 20px", color: "white" }}>
      <InputLabel sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
        {label}
      </InputLabel>
      <Input
        sx={{
          "&:before, &:hover:not(.Mui-disabled):before, &:after": {
            borderBottomColor: "white",
          },
        }}
        onChange={onChangeEvent}
      />
    </FormControl>
  );
};

// interface UserAuthButtonProps {
//   // userAction: (event: React.MouseEvent<HTMLElement>) => void;
//   userAction: () => void;
//   typeOfButton: string;
// }

// const UserAuthButton: React.FC<UserAuthButtonProps> = ({
//   userAction,
//   typeOfButton,
// }) => {
//   return (
//     <Button
//       sx={{
//         width: "200px",
//         margin: "25px 0",
//         alignSelf: "center",
//         backgroundColor: "white",
//         color: "black",
//         "&:hover": { backgroundColor: "rgba(255,255,255,0.7)" },
//       }}
//       variant="contained"
//       disabled={false}
//       onClick={userAction}
//     >
//       {typeOfButton}
//     </Button>
//   );
// };

const Login: React.FC = () => {
  const [user, setUser] = useState<UserProps>({ loginUsername: "" });
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async () => {
    const localTime = moment.tz(moment.tz.guess()).format();
    // これは言語設定のやつ
    // const accessedRegion = navigator.language;
    const accessedRegion = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(accessedRegion);
    try {
      const response = await axios.post("/api/user", {
        username,
        password,
        created:localTime,
        accessedRegion,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async () => {
    console.log(123);
    
  }

  useEffect(() => {
    console.log(username);
    // return () => {
    //   second
    // }
  }, [username]);

  return (
    <div className="flex flex-col justify-around w-full md:flex-row md:h-screen items-center">
      <div css={loginContainer}>
        <InputForm
          label="Username"
          onChangeEvent={(event) => setUsername(event.target.value)}
        ></InputForm>
        <InputForm
          label="Password"
          onChangeEvent={(event) => setPassword(event.target.value)}
        ></InputForm>
        <div className="flex gap-4">
          <UserAuthButton userAction={loginUser} typeOfButton="Login" />
          <UserAuthButton userAction={registerUser} typeOfButton="Register" />
        </div>
      </div>
      <div css={descriptionContainer}>
        <img src="/images/logo.png"></img>
        <ServiceButton
          to="/image-generation"
          backgroundColor="rgb(230, 77, 92)"
          disabled={false}
          title="Image Generator"
        ></ServiceButton>
        <ServiceButton
          to="/gpt-handler"
          backgroundColor="rgb(0, 198, 181)"
          disabled={false}
          title="GPT Handler"
        ></ServiceButton>
      </div>
    </div>
  );
};

export default Login;
