import axios from "axios";

import { useEffect, useState } from "react";

import {
  Box,
  Divider,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import SendIcon from "@mui/icons-material/Send";

import CommonModal from "../common/CommonModal";
import SettingDrawer from "../common/SettingDrawer";
import { Item } from "src/client/types";

interface ImageData {
  url: string;
  imageName: string;
}

const defaultImageName = "placeHolder";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [numberOfImages, setNumberOfImages] = useState<number>(1);
  const [imageSize, setImageSize] = useState<string>("256x256");
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    const placeHolders = [];
    for (let i = 0; i < numberOfImages; i++) {
      placeHolders.push({
        url: `/images/place-holder/${ defaultImageName }.png`,
        imageName: `${defaultImageName}${i}`,
      });
    }
    setImageURLs(placeHolders);
  }, [numberOfImages]);

  const [imageURLs, setImageURLs] = useState<ImageData[]>([]);

  const items: Item[] = [
    {
      title: "Number of Images",
      icon: <InboxIcon />,
      value: numberOfImages,
      component: (
        <Select
          value={numberOfImages}
          onChange={(event) => setNumberOfImages(+event.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      ),
    },
    {
      title: "Size",
      icon: <AspectRatioIcon />,
      value: imageSize,
      component: (
        <Select
          value={imageSize}
          onChange={(event) => setImageSize(event.target.value)}
        >
          <MenuItem value={"256x256"}>256</MenuItem>
          <MenuItem value={"512x512"}>512</MenuItem>
          <MenuItem value={"1024x1024"}>1024</MenuItem>
        </Select>
      ),
    },
  ];

  const getImages = async () => {
    setLoading(true);
    try {
      const data = {
        prompt,
        n: numberOfImages,
        size: imageSize,
        serviceType: "imageGenerator",
      };
      const response = await axios.post("/api/imageGenerator/images", data, {
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
        setImageURLs(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  const downloadImage = async (imageName: string) => {
    try {
      const response: Blob = await axios.get(
        `/api/imageGenerator/downloadImage/${imageName}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
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

      <div className="text-center py-6 text-2xl">Image Generator</div>
      <div className="flex flex-col-reverse md:flex-col w-full flex-grow">
        <section className="flex flex-grow gap-2 justify-center w-full flex-wrap">
          {imageURLs?.map((source: ImageData) => (
            <figure key={source.imageName} className="flex flex-col justify-center gap-2">
              <img src={source.url} className="max-h-60"></img>
              {!source.imageName.includes(defaultImageName) && (
              <Button variant="contained" onClick={() => downloadImage(source.imageName)}>
                DownLoad
              </Button>)}
            </figure>
          ))}
        </section>
        <div className="w-full">
          <Divider sx={{ marginTop: "10px" }}></Divider>
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
                      onClick={getImages}
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

export default ImageGenerator;
