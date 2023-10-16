import axios from "axios";

import { useEffect, useState } from "react";

import {
  Box,
  Divider,
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

import SettingDrawer from "../common/SettingDrawer";
import { Item } from "src/client/types";

interface ImageData {
  url: string;
}

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [numberOfImages, setNumberOfImages] = useState<number>(1);
  const [imageSize, setImageSize] = useState<string>("256x256");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const number = [];
    for (let i = 0; i < numberOfImages; i++) {
      number.push({ url: "/images/place-holder/placeholder.png" });
    }
    setImageURLs({
      data: number,
    });
  }, [numberOfImages]);

  const [imageURLs, setImageURLs] = useState<{ data: ImageData[] }>({
    data: [],
  });

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
      const data = { prompt, n: numberOfImages, size: imageSize };
      const response = await axios.post("/api/imageGenerator/images", data, {
        timeout: 10000,
      });
      setImageURLs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

      <div className="text-center p-10 text-2xl">Image Generator</div>
      <section className="flex gap-2 justify-center w-full flex-wrap">
        {imageURLs.data?.map((source: ImageData, index: number) => (
          <figure key={index} className="">
            <img src={source.url} className="max-h-80"></img>
            {/* <div>{source.url}</div> */}
          </figure>
        ))}
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
  );
};

export default ImageGenerator;
