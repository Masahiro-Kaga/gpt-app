import express from "express";
import dotenv from "dotenv";

import { openaiAuthorized } from "../../middleware/index";

dotenv.config();

const router = express.Router();

router.post("/images", openaiAuthorized, async (req, res) => {
  const openai = req.user.openai;

  console.log("Check env file if it doesn't work.")
  if (process.env.EXECUTABLE_DALL_E === "true") {
    console.time("Image load time");
    try {
      const response = await openai.createImage({
        ...req.body,
        // user: req.session.userId,
      });
      res.json({ pass: true, data: response.data });
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
