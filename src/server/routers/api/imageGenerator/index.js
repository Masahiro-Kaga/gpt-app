import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.CHATGPT_APIKEY
})
const openai = new OpenAIApi(configuration);

router.post("/images", async()=>{
    try {
        if (process.env.EXECUTABLE_DALL_E){
            // const response = await openai.createImage({
            //     prompt: req.body.prompt ? req.body.prompt : "Cute baby",
            //     n: 1,
            //     size: "1024x1024",
            //     user: req.session.userId,
            // });
            
            res.json({ created: Math.floor(Date.now() / 1000), data: [{test:true}] });
            // console.log(response);
            // res.json(response.data);
        } else {
            res.json({ created: Math.floor(Date.now() / 1000), data: [{test:true}] });
        }
    } catch (error) {
        console.error(error)
    }
})

export default router;