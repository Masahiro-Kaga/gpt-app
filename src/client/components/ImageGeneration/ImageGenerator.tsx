import { Button } from "@mui/material";
import Slider from "@mui/material/Slider";
import React from "react";
import axios from "axios";

const ImageGenerator = () => {
  const getImages = async () => {
    try {
      // const options = {

      // };
      const data = { key1: "Value1", key2: "Value2" };
      const response = await axios.post("http://localhost:8000/imageGenerator/images", data);
      console.log("Clicked!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <input className="border-solid"></input>
      <button className="text-[#50d71e]" onClick={getImages}>
        Create
      </button>
      <Button variant="outlined">Outlined</Button>
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
    </>
  );
};

export default ImageGenerator;
