import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { ReactComponent as PlayAiLogoButton } from "../../logo/logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
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
        <Toolbar sx={{ alignSelf: "flex-center" }}>
          <IconButton component={Link} to="/">
            <SvgIcon sx={{ fontSize: "60px" }}>
              <PlayAiLogoButton></PlayAiLogoButton>
            </SvgIcon>
          </IconButton>
          <Box sx={{ marginLeft: "auto" }}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
