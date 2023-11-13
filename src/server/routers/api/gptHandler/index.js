const express = require("express");


const { openaiAuthorized, usageRestrictions } = require(`${global.routesDir}/middleware/index`);

const router = express.Router();

router.post("/answer", openaiAuthorized, usageRestrictions, async (req, res) => {
  const openai = req.openaiAuth;

  console.log("Check env file if it doesn't work.")
  if (process.env.EXECUTABLE_GPT === "true") {
    
    console.time("Answer load time");
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
      req.user.usageCount[req.body.serviceType] += 1;
      await req.user.save();
      res.json({ pass: true, data: answer });
    } catch (error) {
      console.error(error);
    } finally {
      console.timeEnd("Answer load time");
    }
  } else {
    res.json({ pass: true, data: [{ test: true }] });
  }
});

module.exports = router;
