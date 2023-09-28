import express, { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../../models/User.model"
dotenv.config();

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log(User);
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ pass: true, data: newUser });
  } catch (error) {
    res.send({ pass: false, data: "Failed to registere the user." });
  }
});

export default router;
