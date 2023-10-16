import express from "express";
import dotenv from 'dotenv';
import testData from "./testData";
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
        // 本番
            // const response = await openai.createImage({
            //     ...req.body,
            //     // user: req.session.userId,
            // });
        // テスト
            const { testData_2n_1024 } = testData;
            const response = testData_2n_1024;
            // const {  testData_1n_256 } = testData;
            // const response =  testData_1n_256;

            // const response = await openai.createImage({
            //     prompt: req.body.prompt ? req.body.prompt : "Cute baby",
            //     n: 1,
            //     size: "256x256",
            // });

            
            
            
            // 
            // console.dir(response.data, {depth:4});

            res.json({pass:true,data:response.data});

            // res.json({ created: Math.floor(Date.now() / 1000), data: [{test:true}] });
            
            console.timeEnd('Image load time');
        } else {
            res.json({ psss:true, data: [{test:true}] });
        }
    } catch (error) {
        console.error(error)
    }
})

export default router;

            // const response = await openai.createImage({
            //     prompt: req.body.prompt ? req.body.prompt : "Cute baby",
            //     n: 1,
            //     size: "1024x1024",
            // });
