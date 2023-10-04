import { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ServiceButton from "./ServiceButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getHeaderHeight } from "../../store/slice";

interface HeaderProps {
  onHeightChange:(height:number) => void;
}

export default function Header({onHeightChange}:HeaderProps) {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {  
    if(headerRef.current){
      onHeightChange(headerRef.current.offsetHeight);
      dispatch(getHeaderHeight({ headerHeight: headerRef.current.offsetHeight }));
    }
  }, [onHeightChange]);
  
  
  const loginHandler = (loginOrOut: boolean) => setIsLoggedIn(loginOrOut);
  
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
              src="/images/logo2.png"
              sx={{ borderRadius: 0 }}
              style={{ width: "100%", objectFit: "contain" }}
            />
            {/* <img alt="logo" src="/images/logo2.png" style={{ width: 10, height: 10, objectFit: 'cover'}}/> */}
          </IconButton>
          <Box>
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
          </Box>
          <Button onClick={() => loginHandler(!isLoggedIn)}>
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
