import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

export const openaiAuthorized = (req, res, next) => {
  try {
    if (!process.env.CHATGPT_APIKEY) {
      throw new Error("API key not found");
    }

    const configuration = new Configuration({
      apiKey: process.env.CHATGPT_APIKEY,
    });
    const openai = new OpenAIApi(configuration);

    if (!req.user) {
      req.user = {};
    }

    req.user.openai = openai;

    next();
  } catch (error) {
    res.status(500).json({ pass: false, data: error.message });
  }
};
