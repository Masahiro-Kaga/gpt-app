import axios from "axios";

import { useState } from "react";

import {
  Box,
  Divider,
  IconButton,
  TextField,
  Slider,
  InputAdornment,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import ThermostatIcon from "@mui/icons-material/Thermostat";

import SettingDrawer from "../common/SettingDrawer";
import CommonModal from "../common/CommonModal";
import { Item } from "src/client/types";

const GptHandler: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [maxToken, setMaxToken] = useState<number>(500);
  const [temperature, setTemperature] = useState<number>(0.3);
  const [answer, setAnswer] = useState<string>(
    "🤖Let's get the answer by smart AI😀"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const items: Item[] = [
    {
      title: "Max Token",
      icon: <LinearScaleIcon />,
      value: maxToken,
      component: (
        <Box width="80%">
          <Slider
            value={maxToken}
            onChange={(event, newValue) => setMaxToken(newValue as number)}
            min={1}
            max={1000}
            valueLabelDisplay="off"
            defaultValue={300}
          />{" "}
          <Typography gutterBottom>Value: {maxToken}</Typography>
        </Box>
      ),
    },
    {
      title: "Temperature",
      icon: <ThermostatIcon />,
      value: temperature,
      component: (
        <Box width="80%">
          <Slider
            value={temperature}
            onChange={(event, newValue) => setTemperature(newValue as number)}
            min={0.0}
            max={2.0}
            step={0.1}
            valueLabelDisplay="off"
            defaultValue={1.0}
          />{" "}
          <Typography gutterBottom>Value: {temperature}</Typography>
        </Box>
      ),
    },
  ];

  const getAnswer = async () => {
    setLoading(true);

    try {
      const data = { prompt, maxToken, temperature, serviceType: "gptHandler" };
      const response = await axios.post("/api/gptHandler/answer", data, {
        timeout: 10000,
      });
      if (response.data === "Over usage.") {
        handleOpenModal(
          "User cannot request twice or more.",
          "Please reach out to the app developer via LinkedIn to request the removal of restrictions."
        );
      } else if (response.data === "Same IP.") {
        handleOpenModal(
          "User cannot request from the same IP as others.",
          "Ask developer to remove the IP restriction."
        );
      } else {
        setAnswer(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  const handleOpenModal = (title: string, message: string) => {
    setModalContent({ title, message });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative flex flex-col h-full items-center justify-between overflow-auto">
      <Backdrop
        sx={{
          color: "#fff",
          flexDirection: "column",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& .blinkingText": {
            animation: "blinkingText 1.2s infinite",
            "@keyframes blinkingText": {
              "0%": { opacity: 0 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
          },
        }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
        <Typography sx={{ mt: 2 }} className="blinkingText">
          Now downloading, it may take 5 to 20 seconds.
        </Typography>
      </Backdrop>

      <CommonModal
        open={modalOpen}
        title={modalContent.title}
        message={modalContent.message}
        onClose={handleCloseModal}
        linkedIn={true}
      ></CommonModal>

      <div className="text-center p-10 text-2xl">GPT Handler</div>
      <div className="flex flex-col-reverse md:flex-col w-full flex-grow">
        <section className="flex flex-grow gap-2 justify-center w-full flex-wrap">
          <Box maxWidth={800} className="my-auto" >
            <div className="m-5">{answer}</div>
          </Box>
        </section>
        <div className="w-full">
          <Divider></Divider>
          <div className="flex m-4 justify-center">
            <TextField
              label="Input prompt..."
              className=""
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              sx={{
                margin: "0px",
                width: "800px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={getAnswer}
                      edge="end"
                      disabled={prompt.length < 1}
                      color={prompt.length < 1 ? "default" : "primary"}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>
          <div className="flex m-4 justify-center">
            <Box
              position="relative"
              border={1}
              borderColor="rgba(0,0,0,0.2)"
              mt={2}
              pt={1.5}
              pl={2}
              borderRadius="5px"
              width="800px"
              margin="auto"
            >
              <SettingDrawer items={items}>Setting</SettingDrawer>
              <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {items.map((item, index) => (
                  <div key={index}>
                    {item.title}: <span>{item.value}</span>
                  </div>
                ))}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptHandler;
