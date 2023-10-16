import express from "express";
import dotenv from "dotenv";

import { openaiAuthorized } from "../../middleware/index";

dotenv.config();

const router = express.Router();

router.post("/answer", openaiAuthorized, async (req, res) => {
  const openai = req.user.openai;

  console.log("Check env file if it doesn't work.")
  if (process.env.EXECUTABLE_GPT === "true") {
    console.time("Image load time");
    try {
      const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: req.body.prompt
          ? req.body.prompt
          : "Say Prompt could not be loaded. Try again.",
        max_tokens: req.body.maxToken,
        temperature: req.body.temperature,
      });

      const answer = completion.data.choices[0].text;
      res.json({ pass: true, data: answer });
    } catch (error) {
      console.error(error);
    } finally {
      console.timeEnd("Image load time");
    }
  } else {
    res.json({ psss: true, data: [{ test: true }] });
  }
});

export default router;
