import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { validateUser } from "./middleware";
import User from "../../../models/User.model"
import { UserValidationSchema, UserLoginValidationSchema } from "../../../models/User.model";
dotenv.config();

const router = express.Router();

router.post("/", validateUser, async ( req,res ) => {
  try {
    
    
    const { error, value } = UserValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.error(`User login validation error: ${error.message}`)
      return res.status(401).json(`User registration validation error: ${error.message}`)
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ pass: true, data: newUser });
  } catch (error) {
    console.error(`Registration error: ${error.message}`);
    return res.status(500).json("Internal Server Error while user is trying to register.")
  }
});

router.post("/login", async (req,res)=> {
  try {
    const { error, value } = UserLoginValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      
      console.error(`User login validation error: ${error.message}`)
      return res.status(401).json(`User login validation error: ${error.message}`)
    }
    
        const user = await User.findOne( {username:req.body.username} );
        const isValidPassword = user && await bcrypt.compare(req.body.password, user.password);
            if(!user || !isValidPassword){
      
      return res.status(401).json("Unauthorized. Invalid credentials.")
    }
        req.session.userId = user._id;
    req.session.username = user.username;
    res.json( {pass:true,data:"Successful to login."});
  } catch (error) {
        console.error(`Login error: ${error.message}`);
    return res.status(500).json("Internal Server Error while user is logging in.")
  }
})

router.get("/logout", async (req,res)=> {
  try {
    if(!("userId" in req.session)) return res.status(401).json("Session already expired or No session.")     
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({pass:true,data:"Successful to logout."})
  } catch (error) {
    console.error(`Logout error: ${error.message}`);
    return res.status(500).json("Internal Server Error while user is logging out.")

  }
})

router.get("/check-session", async (req,res)=> {
  
  try {
    if(req.session && req.session.userId){
      const user = await User.findOne( {_id:req.session.userId} );
      if(!user){
        
        return res.status(401).json("Unauthorized. Invalid credentials.")
      } 
      
      return res.json({pass:true,data:user.username});
    }
    if(req.session && !("userId" in req.session)) {
      return res.status(440).json("Session expired.");
    }    
  } catch (error) {
    console.error(`Check session error: ${error.message}`);
    return res.status(500).json("Internal Server Error while user check login status.")
  }
})

export default router;
