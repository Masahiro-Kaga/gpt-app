const express = require("express");
const dotenv = require("dotenv");

const { openaiAuthorized, usageRestrictions } = require("../../middleware/index");

dotenv.config();

const router = express.Router();

router.post("/images", openaiAuthorized, usageRestrictions, async (req, res) => {
  const openai = req.openaiAuth;
  console.log("Check env file if it doesn't work.")
  if (process.env.EXECUTABLE_DALL_E === "true") {

    console.time("Image load time");
    try {
      const response = await openai.createImage({
        prompt:req.body.prompt,
        n:req.body.n,
        size:req.body.size,
        // user: req.session.userId,
      });

      req.user.usageCount[req.body.serviceType] += 1;
      await req.user.save();  

      res.json({ pass: true, data: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      console.timeEnd("Image load time");
    }
  } else {
    res.json({ pass: true, data: [{ test: true }] });
  }
});

module.exports = router;
