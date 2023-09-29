import express from "express";
import dotenv from "dotenv";
import { validateUser } from "./middleware";
import User from "../../models/User.model"
import { UserValidationSchema } from "../../models/User.model";
dotenv.config();

const router = express.Router();

router.post("/", validateUser, async ( req,res ) => {
  try {
    console.log(req.body);
    console.log(User);
    const { error, value } = UserValidationSchema.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
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
