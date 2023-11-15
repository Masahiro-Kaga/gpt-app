import moment from "moment-timezone";
import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import {
  Box,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
  List,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import { APIGeneralResponseType } from "../../axiosConfig";
import { RootState } from "../../store/store";
import { fetchSession, deleteSession, setHttpError } from "../../store/slice";
import ServiceButton from "./ServiceButton";
import UserAuthButton from "./UserAuthButton";

interface InputFormProps {
  value: string;
  label: string;
  onChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  value,
  label,
  onChangeEvent,
}) => (
  <FormControl sx={{ margin: "5px 20px", color: "white" }}>
    <InputLabel sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
      {label}
    </InputLabel>
    <Input
      value={value}
      sx={{
        "&:before, &:hover:not(.Mui-disabled):before, &:after": {
          borderBottomColor: "white",
        },
        "& .MuiInput-input": {
          color: "white",
        },
      }}
      onChange={onChangeEvent}
    />
  </FormControl>
);

interface ModalProps {
  open: boolean;
  title: string;
  message: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logInOutModal, setLogInOutModal] = useState<ModalProps>({
    open: false,
    title: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width:768px)");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHttpError({ httpError: "" }));
  }, [dispatch]);
  const user = useSelector((state: RootState) => state.userKey);

  const registerUser = async () => {
    setLoading(true);
    const localTime = moment.tz(moment.tz.guess()).format();
    const accessedRegion = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      const response: APIGeneralResponseType = await axios.post("/api/user/register", {
        username,
        password,
        localTime,
        accessedRegion,
      });
      if ( !response.pass ) {
        setLogInOutModal({
          open: true,
          title: "Failed",
          message: "Username already exists",
        });
        setLoading(false);
        return;
      }
      if (user.isSessionActive) {
        const logoutResponse: APIGeneralResponseType = await axios.get(
          "/api/user/logout"
        );
        logoutResponse.pass && dispatch(deleteSession());
      }
      const loginResponse: APIGeneralResponseType = await axios.post(
        "/api/user/login",
        {
          username,
          password,
        }
      );
      loginResponse.pass && dispatch(fetchSession({ username }));
      setLogInOutModal({
        open: true,
        title: response.pass ? "Success!" : "Failed",
        message: response.pass
          ? "You are now Registered and Logged in!"
          : response.data,
      });
    } catch (error) {
      console.error(error);
      setLogInOutModal({
        open: true,
        title: "Failed",
        message: "An error occurred",
      });
      setLoading(false);
    } finally {
      setUsername("");
      setPassword("");
      setLoading(false);
    }
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      const response: APIGeneralResponseType = await axios.post(
        "/api/user/login",
        {
          username,
          password,
        }
      );
      response.pass && dispatch(fetchSession({ username }));
      setLogInOutModal({
        open: true,
        title: response.pass ? "Success!" : "Failed",
        message: response.pass ? "You are now Logged In!" : response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUsername("");
      setPassword("");
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
      setLogInOutModal({
        open: true,
        title: response.pass ? "Success!" : "Failed",
        message: response.pass ? "You are now Logged Out!" : response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const linkedinNaviagtor = () => {
    window.open("https://www.linkedin.com/in/masahiro-kaga-ab8604192/", "_blank");
  }

  return (
    <div className="relative flex flex-col-reverse justify-around w-full md:flex-row md:h-screen items-center">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div css={descriptionContainer}>
        <div css={userActiveStatusContainer(!!user.username)}>
          <div>
            User Status:
            {user.username ? (
              <span className="text-green-400"> Logged In</span>
            ) : (
              <span className="text-red-500"> Nobody Logged In</span>
            )}
          </div>

          {user.username && (
            <div>
              User: <span className="text-green-400">{user.username}</span>
            </div>
          )}
        </div>
        {user.isSessionActive ? (
          <div css={loginContainer}>
            <List>
              <ListItemText css={ listItemIndent }>・Select a service {isDesktop ? " on the right" : "above"} to start playing.</ListItemText>
              <ListItemText css={ listItemIndent }>・Usage limit of each service is 1 time per User or IP Location due to security and API cost considerations.</ListItemText>
              <ListItemText css={ listItemIndent }>・For unlimited access or any inquiries, please contact me via LinkedIn below.</ListItemText>
            </List>
            <div className="flex gap-2">
              <UserAuthButton userAction={linkedinNaviagtor} typeOfButton="LinkedIn" />
              <UserAuthButton userAction={logoutUser} typeOfButton="Logout" />
            </div>
          </div>
        ) : (
          <div css={loginContainer}>
            <InputForm
              value={username}
              label="Username"
              onChangeEvent={(event) => setUsername(event.target.value)}
            ></InputForm>
            <InputForm
              value={password}
              label="Password"
              onChangeEvent={(event) => setPassword(event.target.value)}
            ></InputForm>

            <div className="flex gap-2">
              <UserAuthButton userAction={loginUser} typeOfButton="Login" />
              <UserAuthButton
                userAction={registerUser}
                typeOfButton="Register"
              />
            </div>
          </div>
        )}{" "}
      </div>
      <div css={descriptionContainer}>
        <img src="/images/logo.png"></img>
        <div
          css={blinkingStyles}
          className={`flex flex-col gap-2 ${!user.isSessionActive && "hidden"}`}
        >
          <ServiceButton
            to="/contents/image-generation"
            fontSize="1rem"
            backgroundColor="rgb(245, 186, 71)"
            disabled={user.isSessionActive ? false : true}
            title="Image Generator"
          ></ServiceButton>
          <ServiceButton
            to="/contents/gpt-handler"
            fontSize="1rem"
            backgroundColor="rgb(11, 144, 166)"
            disabled={user.isSessionActive ? false : true}
            title="GPT Handler"
          ></ServiceButton>
          <ServiceButton
            to="/contents/audio-script"
            fontSize="1rem"
            backgroundColor="rgb(230, 144, 166)"
            disabled={user.isSessionActive ? false : true}
            title="Audio Scriptor"
          ></ServiceButton>
        </div>
      </div>
      <Modal
        open={logInOutModal.open}
        onClose={() =>
          setLogInOutModal({ open: false, title: "", message: "" })
        }
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            maxWidth: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {logInOutModal.title}
          </Typography>
          <Typography id="modal-description" variant="body1">
            {logInOutModal.message}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              setLogInOutModal({ open: false, title: "", message: "" })
            }
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const commonContainerStyles = css`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin: 0 10px;
  max-width: 400px;
`;

const userActiveStatusContainer = (isActive: boolean) => css`
  ${commonContainerStyles};
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  & div span {
    color: ${isActive ? "green" : "red"};
  }
`;

const loginContainer = css`
  ${commonContainerStyles};
  background-color: rgba(0, 0, 0, 0.6);
  gap: 20px;
  padding: 20px;
`;

const descriptionContainer = css`
  ${commonContainerStyles};
  width: 100%;
  margin: 20px 0;
`;

const listItemIndent = css`
  color: white;
  padding: 5px .8em;
  text-indent: -1.0em;
  text-align: justify;
`;

const blinkingStyles = css`
  animation: ${keyframes`
    50% { opacity: 0.5; }
    0 100% { opacity: 1; }
  `} 2s 3;
`;



export default Login;
