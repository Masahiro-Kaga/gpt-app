import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import logo from "../../logo/logo.png";

interface ImageData {
  url: string;
}

const ImageGenerator = () => {
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [imageURLs, setImageURLs] = useState<{ data: ImageData[] }>({
    data: [],
  });
  const getImages = async () => {
    // For the test.
    setImageURLs({
      data: [
        {
          url: "/images/place-holder/place-holder.png",
        },
        {
          url: "/images/place-holder/place-holder.png",
        },
        {
          url: "/images/place-holder/place-holder.png",
        },
        {
          url: "/images/place-holder/place-holder.png",
        },
      ],
    });

    // try {
    //   const data = { prompt: imagePrompt };
    //   const response = await axios.post(
    //     "http://localhost:8000/imageGenerator/images",
    //     data
    //   );
    //   console.log("Clicked!");
    //   if (response.data.data[0].test) {
    //     setImageURLs({
    //       data: [
    //         {
    //           url: "../../logo/logo.png",
    //         },
    //         {
    //           url: "../../logo/logo.png",
    //         },
    //         {
    //           url: "../../logo/logo.png",
    //         },
    //         {
    //           url: "../../logo/logo.png",
    //         },
    //       ],
    //     });
    //   } else {
    //     setImageURLs(response.data);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const containerStyle = css`
    margin: auto;
    width: 90vw;
    max-width: 1800px;
    background-color: white;
  `;
  return (
    <>
      <div css={containerStyle}>
        <input
          className="border-solid"
          value={imagePrompt}
          onChange={(event) => setImagePrompt(event.target.value)}
        ></input>

        <Button variant="outlined" onClick={getImages}>
          Create
        </Button>
        {/* <figure>
           <img src="ANY IMAGE HERE" alt="" />
         </figure> */}

        <section className="grid grid-cols-1 md:grid-cols-2">
          {imageURLs.data?.map((source: ImageData, index: number) => (
            <figure key={index} className="w-full max-w-xl m-auto">
              <img src={source.url} className="grayscale opacity-30"></img>
              {/* <div>{source.url}</div> */}
            </figure>
          ))}
        </section>
      </div>
    </>
  );
};

export default ImageGenerator;
