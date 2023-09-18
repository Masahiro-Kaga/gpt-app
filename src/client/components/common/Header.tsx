import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const loginHandler = (loginOrOut:boolean) => setIsLoggedIn(loginOrOut);
  

  return (
    <Box
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
            <IconButton sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.0)' } }} component={Link} to="/">
              <Avatar alt="logo" src="/images/logo2.png" sx={{ borderRadius: 0 }} style={{ width: '100%', objectFit: 'contain'}} />
              {/* <img alt="logo" src="/images/logo2.png" style={{ width: 10, height: 10, objectFit: 'cover'}}/> */}
            </IconButton>
          <Box>
            <Button
              component={Link}
              to="/image-generation"
              variant="contained"
              sx={{
                fontSize: "1rem",
                backgroundColor: "rgb(230, 77, 92)",
                "&:hover": {
                  color: "black",
                  backgroundColor: "white",
                },
                marginRight: "10px",
                marginLeft: "50px",
              }}
            >
              Image Generator
            </Button>
            <Button
              component={Link}
              to="/gpt-handler"
              variant="contained"
              sx={{
                fontSize: "1rem",
                backgroundColor: "rgb(0, 198, 181)",
                "&:hover": {
                  color: "black",
                  backgroundColor: "white",
                },
              }}
            >
              GPT Handler
            </Button>
          </Box>
          <Button onClick={()=>loginHandler(!isLoggedIn)}>{isLoggedIn ? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
