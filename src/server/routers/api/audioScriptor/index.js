import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { Readable } from "stream";

import { openaiAuthorized } from "../../middleware/index";

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post( "/script", openaiAuthorized, upload.single("audio"), async (req, res) => {
    const openai = req.user.openai;

    console.log("Check env file if it doesn't work.")
    if (process.env.EXECUTABLE_WHISPER === "true") {
      console.time("Image load time");
      try {
        const audioBuffer = req.file.buffer;
        const bufferStream = Readable.from(audioBuffer);
        bufferStream.path = req.file.originalname;

        const script = await openai.createTranscription(
          bufferStream,
          "whisper-1",
          undefined,
          undefined,
          +req.body.temperature,
          req.body.language,
          {
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        res.json({ pass: true, data: script.data.text });
      } catch (error) {
        res.json({ pass: false, data: "Test unsuccessful" });
      } finally {
        console.timeEnd("Image load time");
      }
    } else {
      res.json({ psss: true, data: [{ test: true }] });
    }
  }
);

export default router;
