/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Button, FormControl, Input, InputLabel, Modal, Typography, CircularProgress, Backdrop } from "@mui/material";
import ServiceButton from "./ServiceButton";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import axios from "axios";
import { APIGeneralResponseType } from "../../axiosConfig"; // どっちがいいのかね。
// import { APIGeneralResponse } from "src/client/types";
import UserAuthButton from "./UserAuthButton";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSession, deleteSession } from "../../store/slice";
import { useSelector } from "react-redux";
import { testString } from "./something";
import { anyString } from "../anything";
import { set } from "mongoose";

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

const userActiveStatusContainer = (isActive:boolean) => css`
  ${commonContainerStyles};
  background-color: rgba(0, 0, 0, 0.6);
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  & div span{
    color: ${isActive ? 'green' : 'red'};
  }
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
          "& .MuiInput-input": {
            color: 'white',
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
interface ModalProps {
  open: boolean;
  title: string;
  message: string;
}

const Login: React.FC = () => {
  // const [user, setUser] = useState<UserProps>({ loginUsername: "" });
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logInOutModal, setLogInOutModal] = useState<ModalProps>({open:false, title:"", message:""});
  const [loading,setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userKey);

  const registerUser = async () => {
    const localTime = moment.tz(moment.tz.guess()).format();
    // これは言語設定のやつ
    // const accessedRegion = navigator.language;
    const accessedRegion = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(accessedRegion);
    try {
      const response: APIGeneralResponseType = await axios.post("/api/user", {
        username,
        password,
        localTime,
        accessedRegion,
      });
      console.log(response);
      setLogInOutModal({open:true, title:response.pass ? "Success!" : "Failed" ,message:response.pass ? "You are now Registered!" : response.data});
    } catch (error) {
      console.log("Error!On Register API sent");
      console.log(error);
    }
  };

  const loginUser = async (): Promise<APIGeneralResponseType> => {
    setLoading(true);
    try {
      const response: APIGeneralResponseType = await axios.post(
        "/api/user/login",
        {
          username,
          password,
        }
      );
      console.log("Login response??");
      console.log(response.pass);
      response.pass && dispatch(fetchSession({ username }));
      setLogInOutModal({open:true, title:response.pass ? "Success!" : "Failed" ,message:response.pass ? "You are now Logged In!" : response.data});
      return response;
    } catch (error) {
      console.error(error);
      return { pass: false, data: "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: APIGeneralResponseType = await axios.get(
        "/api/user/logout"
      );
      response.pass && dispatch(deleteSession());
      setLogInOutModal({open:true, title:response.pass ? "Success!" : "Failed" ,message:response.pass ? "You are now Logged Out!" : response.data});
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <div className="relative flex justify-around w-full md:flex-row md:h-screen items-center">
            {/* {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999, // 他の要素より前面に表示させるためのz-index
          pointerEvents: 'auto', // 背後の要素とのインタラクションを防ぐ
        }}>
          <CircularProgress />
        </div>
      )} */}

<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)} // クリックしてローディングを非表示にする（オプショナル）
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <div>
        {/* // if user is logged in, show user.username and logout button
      // else show login form */}
        <div css={userActiveStatusContainer(!!user.username)}>
          <div>User Status:
          {user.username ? (
            <span className="text-green-400"> Logged in as {user.username}</span>
            ) : (
              <span className="text-red-500"> Not logged in</span>
              )}
              </div>
        </div>
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
            {user.isSessionActive ? (
              <UserAuthButton userAction={logoutUser} typeOfButton="Logout" />
            ) : (
              <UserAuthButton userAction={loginUser} typeOfButton="Login" />
            )}

            <UserAuthButton userAction={registerUser} typeOfButton="Register" />
          </div>
        </div>
      </div>
      <Modal
        open={logInOutModal.open}
        onClose={()=>setLogInOutModal({open:false,title:"",message:""})}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            display: 'flex', // <-- Flexboxを使用
            flexDirection: 'column', // <-- 子要素を垂直方向に並べる
            gap: 3, // <-- 子要素間に均等なスペースを設定
        
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
          {logInOutModal.title}
          </Typography>
          <Typography id="modal-description" variant="body1">
            {logInOutModal.message}
          </Typography>
          <Button variant="contained" color="secondary" onClick={()=>setLogInOutModal({open:false,title:"",message:""})}>
            Close Modal
          </Button>
        </Box>
      </Modal>
      <div css={descriptionContainer}>
        <img src="/images/logo.png"></img>
        <ServiceButton
          to="/contents/image-generation"
          backgroundColor="rgb(230, 77, 92)"
          disabled={false}
          title="Image Generator"
        ></ServiceButton>
        <ServiceButton
          to="/contents/gpt-handler"
          backgroundColor="rgb(0, 198, 181)"
          disabled={false}
          title="GPT Handler"
        ></ServiceButton>
      </div>
    </div>
  );
};


export default Login;