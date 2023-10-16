/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ServiceButton from "./ServiceButton";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import axios from "axios";
import { APIGeneralResponseType } from "../../axiosConfig";
import UserAuthButton from "./UserAuthButton";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { fetchSession, deleteSession } from "../../store/slice";
import { useSelector } from "react-redux";

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

const userActiveStatusContainer = (isActive: boolean) => css`
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
  & div span {
    color: ${isActive ? "green" : "red"};
  }
`;

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
            color: "white",
          },
        }}
        onChange={onChangeEvent}
      />
    </FormControl>
  );
};

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

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userKey);

  const registerUser = async () => {
    const localTime = moment.tz(moment.tz.guess()).format();
    const accessedRegion = Intl.DateTimeFormat().resolvedOptions().timeZone;
    ;
    try {
      const response: APIGeneralResponseType = await axios.post("/api/user", {
        username,
        password,
        localTime,
        accessedRegion,
      });
      ;
      setLogInOutModal({
        open: true,
        title: response.pass ? "Success!" : "Failed",
        message: response.pass ? "You are now Registered!" : response.data,
      });
    } catch (error) {
      ;
      ;
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
      ;
      ;
      response.pass && dispatch(fetchSession({ username }));
      setLogInOutModal({
        open: true,
        title: response.pass ? "Success!" : "Failed",
        message: response.pass ? "You are now Logged In!" : response.data,
      });
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
      setLogInOutModal({
        open: true,
        title: response.pass ? "Success!" : "Failed",
        message: response.pass ? "You are now Logged Out!" : response.data,
      });
      ;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ;
  }, [username]);

  return (
    <div className="relative flex justify-around w-full md:flex-row md:h-screen items-center">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <div css={userActiveStatusContainer(!!user.username)}>
          <div>
            User Status:
            {user.username ? (
              <span className="text-green-400">
                Logged in as {user.username}
              </span>
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
            width: 400,
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
            Close Modal
          </Button>
        </Box>
      </Modal>
      <div css={descriptionContainer}>
        <img src="/images/logo.png"></img>
        <ServiceButton
          to="/contents/image-generation"
          backgroundColor="rgb(245, 186, 71)"
          disabled={user.isSessionActive ? false : true}
          title="Image Generator"
        ></ServiceButton>
        <ServiceButton
          to="/contents/gpt-handler"
          backgroundColor="rgb(11, 144, 166)"
          disabled={user.isSessionActive ? false : true}
          title="GPT Handler"
        ></ServiceButton>
        <ServiceButton
          to="/contents/audio-script"
          backgroundColor="rgb(230, 144, 166)"
          disabled={user.isSessionActive ? false : true}
          title="Audio Scriptor"
        ></ServiceButton>
      </div>
    </div>
  );
};

export default Login;
