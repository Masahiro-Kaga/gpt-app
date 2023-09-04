import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface ImageData {
  url: string;
}

const ImageGenerator = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageURLs, setImageURLs] = useState<{ data: ImageData[] }>({
    data: [],
  });
  const getImages = async () => {
    try {
      // const data = { prompt: imagePrompt };
      // const response = await axios.post(
      //   "http://localhost:8000/imageGenerator/images",
      //   data
      // );
      console.log("Clicked!");
      // if (response.data.data[0].test) {
      //   setImageURLs({
      //     data: [
      //       {
      //         url: "/images/image-generator/for_test-DALL_E.png",
      //       },
      //     ],
      //   });
      // } else {
      //   setImageURLs(response.data);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        className="border-solid"
        value={imagePrompt}
        onChange={(event) => setImagePrompt(event.target.value)}
      ></input>

      <Button variant="outlined" onClick={getImages}>Create</Button>
      {/* <figure>
        <img src="ANY IMAGE HERE" alt="" />
      </figure> */}
      <section>
        {imageURLs.data?.map((source: ImageData, index: number) => (
          <div key={index}>
            <img src={source.url}></img>
            <div>{source.url}</div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ImageGenerator;
