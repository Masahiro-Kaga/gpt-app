import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { validateUser } from "./middleware";
import User from "../../../models/User.model"
import { UserValidationSchema } from "../../../models/User.model";
dotenv.config();

const router = express.Router();

router.post("/", validateUser, async ( req,res ) => {
  try {
    console.log('req.headers???');
    console.log(req.headers);
    const { error, value } = UserValidationSchema.validate(req.body);
    if (error) {
      console.error(`User login validation error: ${error.message}`)
      return res.status(401).json({pass:false, data:`User login validation error: ${error.message}`})
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ pass: true, data: newUser });
  } catch (error) {
    console.error(`Registration error: ${error.message}`);
    return res.status(500).json({pass:false,data:"Internal Server Error while user is trying to register."})
  }
});

router.post("/login", async (req,res)=> {
  try {
    if(!req.body.username) return res.status({pass: false, data: "Bad Request. Username is required."}) 
    // もしユーザーいなければnullを返す。
    const user = await User.findOne( {username:req.body.username} );
    // if(!user) return res.status(401).json({pass:false,data:"Unauthorized, User not found."})
    const isValidPassword = user && await bcrypt.compare(req.body.password, user.password);
    // if(!isValidPassword) return res.status(401).json({pass:false, data:"Unauthorized, Invalid password."})
    // 逆に、エラーの内容を明らかにさせないというのもセキュリティ上の対策。
    if(!user || !isValidPassword){
      console.log("Login error: Unauthorized. Invalid credentials.")
      return res.status(401).json({pass:false, data:"Unauthorized. Invalid credentials."})
    }
    req.session.userId = user._id;
    res.json( {pass:true,data:"Successful to login."});
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    return res.status(500).json({pass:false,data:"Internal Server Error while user is logging in."})
  }
})

router.get("/logout", async (req,res)=> {
  try {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({pass:true,data:"Successful to logout."})
  } catch (error) {
    console.error(`Logout error: ${error.message}`);
    return res.status(500).json({pass:false,data:"Internal Server Error while user is logging out."})

  }
})

export default router;
