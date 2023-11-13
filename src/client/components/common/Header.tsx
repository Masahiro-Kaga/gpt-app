import { useRef, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  useMediaQuery,
  List,
  ListItemText,
  Drawer,
  ListItemButton,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import CommonModal from "../common/CommonModal";

import { Link, useNavigate } from "react-router-dom";
import ServiceButton from "./ServiceButton";
import { useDispatch, useSelector } from "react-redux";
import { getHeaderHeight, deleteSession } from "../../store/slice";
import { RootState } from "src/client/store/store";
import { APIGeneralResponseType } from "src/client/axiosConfig";
import axios from "axios";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.userKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenModal = (title: string, message: string) => {
    setModalContent({ title, message });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (headerRef.current) {
      dispatch(
        getHeaderHeight({ headerHeight: headerRef.current.offsetHeight })
      );
    }
  }, [isDesktop]);

  const logoutUser = async (): Promise<void> => {
    try {
      handleOpenModal(
        "Logout successfully",
        "Automatically navigate you to the Home right now."
      );
      setTimeout(async () => {
        try {
          handleCloseModal();
          const response: APIGeneralResponseType = await axios.get(
            "/api/user/logout"
          );
          if (response.pass) {
            dispatch(deleteSession());
            navigate("/");
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      }, 2000);
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        <ListItemButton component={Link} to="/contents/image-generation">
          <ListItemText primary="Image Generator" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contents/gpt-handler">
          <ListItemText primary="GPT Handler" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contents/audio-script">
          <ListItemText primary="Audio Scriptor" />
        </ListItemButton>
      </List>
      <List>
        <ListItemButton onClick={() => logoutUser()}>
          <ListItemText primary={user.isSessionActive ? "Logout" : ""} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <CommonModal
        open={modalOpen}
        title={modalContent.title}
        message={modalContent.message}
        onClose={handleCloseModal}
        noButton={true}
      ></CommonModal>

      {isDesktop ? (
        <Box
          ref={headerRef}
          sx={{
            flexGrow: 1,
            padding: "10px 20px",
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
              </IconButton>
              <Box>
                <ServiceButton
                  to="/contents/image-generation"
                  fontSize="13px"
                  title="Image Generator"
                  backgroundColor="rgb(245, 186, 71)"
                  disabled={false}
                ></ServiceButton>
                <ServiceButton
                  to="/contents/gpt-handler"
                  fontSize="13px"
                  title="GPT Handler"
                  backgroundColor="rgb(11, 144, 166)"
                  disabled={false}
                ></ServiceButton>
                <ServiceButton
                  to="/contents/audio-script"
                  fontSize="13px"
                  title="Audio Scriptor"
                  backgroundColor="rgb(230, 144, 166)"
                  disabled={false}
                ></ServiceButton>
              </Box>
              <Button onClick={() => logoutUser()}>
                {user.isSessionActive && "Logout"}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box
          ref={headerRef}
          sx={{
            flexGrow: 1,
            padding: 0,
            maxWidth: "100%",
            margin: "auto",
          }}
        >
          <AppBar
            position="static"
            sx={{
              width: "100%",
              bgcolor: "rgba(255,255,255,0.7)",
              boxShadow: "none",
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "40px",
              }}
            >
              <IconButton
                sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.0)" } }}
                onClick={() => navigate("/")}
              >
                <Avatar
                  alt="logo"
                  src="/images/logoSmall.png"
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
                }}
              >
                {drawer}
              </Drawer>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}

export default Header;