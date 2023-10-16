import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.CHATGPT_APIKEY
})
const openai = new OpenAIApi(configuration);

router.post("/images", async(req,res)=>{
    try {
        if (process.env.EXECUTABLE_DALL_E === "true"){
            console.time('Image load time');
            res.json({pass:true,data:response.data});                        
            console.timeEnd('Image load time');
        } else {
            res.json({ psss:true, data: [{test:true}] });
        }
    } catch (error) {
        console.error(error)
    }
})

export default router;

                                                            