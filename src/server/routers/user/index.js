import express, { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../../models/User.model"
dotenv.config();

const router = express.Router();

router.post("/", async ( req,res ) => {
  try {
    console.log(req.body);
    console.log(User);
    const existingUser = await User.findOne( {username:req.body.username} );
    console.log(existingUser)
    if (existingUser) {
        return res.json({ pass: false, data: "Username already taken." });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ pass: true, data: newUser });
  } catch (error) {
    console.error(error);
    res.send({ pass: false, data: "Failed to registere the user." });
  }
});

export default router;
