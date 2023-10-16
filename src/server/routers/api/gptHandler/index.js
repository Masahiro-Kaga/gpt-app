import express from "express";
import dotenv from 'dotenv';
import { openaiAuthorized } from "../../middleware/index";

dotenv.config();

const router = express.Router();

// router.post("/answer", async(req,res)=>{
router.post("/answer", openaiAuthorized, async(req,res)=>{
    
    
    
    const openai = req.user.openai;
    // const response = await openai.listEngines();

    // 
    // 
    // 
    // console.dir(response.data, {depth:4});

    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: req.body.prompt ? req.body.prompt : "Say Prompt could not be loaded. Try again.",
        max_tokens: req.body.maxToken,
        temperature: req.body.temperature,
      });
    
    console.dir(completion.data, {depth:4})
    const answer = completion.data.choices[0].text;
    res.json({pass:true,data:answer});
    // try {
    // } catch (error) {
         
    // }  
})

export default router;

// instruct-gptとは？？・
  // https://the-decoder.com/openai-releases-new-language-model-instructgpt-3-5/
  // chat と　completionどっち使えばいいのか　ー＞https://blog.micheam.com/2023/08/09/openai-chat-completions-vs-completions/#:~:text=Completions%20API%20%E3%81%AF%20%E5%8D%98%E4%B8%80,%E3%81%93%E3%81%A8%E3%81%8C%E9%81%95%E3%81%84%E3%81%A8%E3%81%97%E3%81%A6%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82