import express from "express";
import dotenv from 'dotenv';
import { openaiAuthorized } from "../../middleware/index";

dotenv.config();

const router = express.Router();

router.post("/answer", openaiAuthorized, async(req,res)=>{
    
    
    
    const openai = req.user.openai;
    
                
    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: req.body.prompt ? req.body.prompt : "Say Prompt could not be loaded. Try again.",
        max_tokens: req.body.maxToken,
        temperature: req.body.temperature,
      });
    
    console.dir(completion.data, {depth:4})
    const answer = completion.data.choices[0].text;
    res.json({pass:true,data:answer});
                 
    })

export default router;

    