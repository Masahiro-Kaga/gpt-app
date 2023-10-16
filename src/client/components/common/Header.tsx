import { useState, useRef, useEffect } from "react";
import { AppBar, Box, Toolbar, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ServiceButton from "./ServiceButton";
import { useDispatch, useSelector } from "react-redux";
import { getHeaderHeight, deleteSession } from "../../store/slice";
import { RootState } from "src/client/store/store";
// import { APIGeneralResponseType, testString } from "src/client/axiosConfig";
import { APIGeneralResponseType, testStringDIF } from "src/client/axiosConfig";
import axios from "axios";
// const { testString } = require('../../constants');
import { testString,testSuperString } from "../../constants";
// import { TestString } from "src/client/constants"; 
// import * as some from "src/client/constants";

export default function Header() {
  const user = useSelector((state: RootState) => state.userKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);
  // const something: ContentsRouteType = {
  //   to: "/contents/image-generation",
  //   backgroundColor: "rgb(230, 77, 92)",
  //   disabled: false,
  //   title: "Image Generator",
  // };
  ;
  
  // ;
  useEffect(() => {
    if (headerRef.current) {
      dispatch(
        getHeaderHeight({ headerHeight: headerRef.current.offsetHeight })
      );
    }
  }, []);

  const logoutUser = async (): Promise<void> => {
    try {
      const response: APIGeneralResponseType = await axios.get(
        "/api/user/logout"
      );
      response.pass && dispatch(deleteSession());
      navigate("/");
      ;
    } catch (error) {
      console.error(error);
    }
  };

  // const loginHandler = (loginOrOut: boolean) => setIsLoggedIn(loginOrOut);

  return (
    <Box
      ref={headerRef}
      sx={{
        flexGrow: 1,
        padding: { xs: "100px", sm: "20px" },
        maxWidth: "1500px",
        margin: "auto",
      }}
    >
      <AppBar
        position="static"
        sx={{
          borderRadius: "25px 25px 25px 25px",
          bgcolor: "rgba(255,255,255,0.7)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.0)" } }}
            component={Link}
            to="/"
          >
            <Avatar
              alt="logo"
              src="/images/logoSmall.png"
              sx={{ borderRadius: 0 }}
              style={{ width: "100%", objectFit: "contain" }}
            />
            {/* <img alt="logo" src="/images/logoSmall.png" style={{ width: 10, height: 10, objectFit: 'cover'}}/> */}
          </IconButton>
          <Box>
            {/* {contentsRoute.map((route:ContentsRouteType) => (
              <ServiceButton
                to={route.to}
                backgroundColor={route.backgroundColor}
                disabled={route.disabled}
                title={route.title}
              />
            ))} */}
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
            <ServiceButton
              to="/contents/audio-script"
              backgroundColor="rgb(0, 1, 181)"
              disabled={false}
              title="Audio Scriptor"
            ></ServiceButton>
          </Box>
          {user.isSessionActive && (
            <Button onClick={() => logoutUser()}>
              {/* {user.isSessionActive && `${user.username} Logout`} */}
              {user.isSessionActive && "Logout"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
