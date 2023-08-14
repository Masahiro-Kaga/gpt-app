import { Button } from "@mui/material";
import Slider from "@mui/material/Slider"
import React from "react";

const ImageGenerator = () => {
    const getImages = async () => {
        try {
          const options = {};
        } catch (error) {}
      };
      return (
        <>
          <input className="border-solid"></input>
          <button className="text-[#50d71e]">Create</button>
          <Button variant="outlined">Outlined</Button>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </>
      );
    
}

export default ImageGenerator