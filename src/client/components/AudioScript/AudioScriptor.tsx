import axios from "axios";

import { useRef, useState } from "react";

import { selectLanguage } from "@client/utility/constants"

import {
  Box,
  Divider,
  IconButton,
  TextField,
  Slider,
  InputAdornment,
  Typography,
  Autocomplete,
  Input,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SettingDrawer from "../common/SettingDrawer";
import CommonModal from "../common/CommonModal";
import { Item } from "src/client/types";
import SendIcon from "@mui/icons-material/Send";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LanguageIcon from "@mui/icons-material/Language";

const AudioScriptor: React.FC = () => {
  const [language, setLanguage] = useState<string>("en");
  const [temperature, setTemperature] = useState<number>(0.2);
  const [script, setScript] = useState<string>(
    "🤖Let's get the transcript by smart AI🎤"
  );
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  interface LanguageOption {
    code: string;
    name: string;
  }
  const items: Item[] = [
    {
      title: "Language",
      icon: <LanguageIcon />,
      value: language,
      component: (
        <Box width="80%">
          <Autocomplete
            value={selectLanguage.find((lang) => lang.code === language)}
            onChange={(event, newValue: LanguageOption | null) =>
              setLanguage(newValue ? newValue.code : "")
            }
            getOptionLabel={(option: LanguageOption) => option.name}
            options={selectLanguage}
            filterOptions={(options, params) => {
              if (params.inputValue.length < 2) {
                return [];
              }
              return options.filter((option) =>
                option.name
                  .toLowerCase()
                  .includes(params.inputValue.toLowerCase())
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Choose a language" />
            )}
          />
          <Typography gutterBottom>Value: {language}</Typography>
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
            max={1.0}
            step={0.1}
            valueLabelDisplay="off"
            defaultValue={0.2}
          />{" "}
          <Typography gutterBottom>Value: {temperature}</Typography>
        </Box>
      ),
    },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (!file) return;

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("language", language);
    formData.append("temperature", temperature.toString());
    formData.append("serviceType", "audioScriptor");
    setLoading(true);

    try {
      const response = await axios.post("/api/audioScriptor/script", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        setScript(response.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error) {
        console.error("Server response error:", error);
      }
    } finally {
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

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
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

      <div className="text-center p-10 text-2xl">Audio Scriptor</div>
      <div className="flex flex-col-reverse md:flex-col w-full flex-grow">
        <section className="flex flex-grow gap-2 justify-center w-full flex-wrap">
          <Box maxWidth={800} className="my-auto">
            <div className="m-5">{script}</div>
          </Box>
        </section>
        <div className="w-full">
          <Divider></Divider>
          <div className="flex m-4 justify-center">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept="audio/*"
              style={{ display: "none" }}
            />
            <Button variant="contained" onClick={triggerFileInputClick}>
              Choose File
            </Button>
            <Input
              type="text"
              value={file ? file.name : ""}
              readOnly
              placeholder="No file chosen"
              sx={{
                marginLeft: "20px",
                width: "500px",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleFileUpload}
                    edge="end"
                    disabled={file === null}
                    color={file === null ? "default" : "primary"}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
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

export default AudioScriptor;
