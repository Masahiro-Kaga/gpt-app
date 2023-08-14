import express, { Request, Response } from "express";
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.CHATGPT_APIKEY
})
const openai = new OpenAIApi(configuration);

router.post("/images", async(req:Request,res:Response)=>{
    try {
        // const response = await openai.createImage({
        //     prompt: "A cute baby sea other",
        //     n: 2,
        //     size: "1024x1024"
        // });
        // console.log(response);
        // res.send(response.data.data);
        console.log(req.body);
        console.log("Success Post");
    } catch (error) {
        console.error(error)
    }
})

export default router;