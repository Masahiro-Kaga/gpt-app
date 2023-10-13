import express from "express";
import dotenv from 'dotenv';
import { openaiAuthorized } from "../../middleware/index";

dotenv.config();

const router = express.Router();

// router.post("/answer", async(req,res)=>{
router.post("/answer", openaiAuthorized, async(req,res)=>{
    console.log('req.body???');
    console.log(req.body);
    console.log(req.user);
    const openai = req.user.openai;
    // const response = await openai.listEngines();

    // console.log("openai???");
    // console.log(openai);
    // console.log("response.data???");
    // console.dir(response.data, {depth:4});

    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: req.body.prompt ? req.body.prompt : "Say Prompt could not be loaded. Try again.",
        max_tokens: req.body.maxToken,
        temperature: req.body.temperature,
      });
    console.log("completion.data???")
    console.dir(completion.data, {depth:4})
    const answer = completion.data.choices[0].text;
    res.json({pass:true,data:answer});
    // try {
    // } catch (error) {
         
    // }  
})

export default router;
