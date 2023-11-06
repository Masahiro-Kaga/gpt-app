const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Schema } = mongoose;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  userRole:{
    required: true,
    type: String,
    default: "user",
  },
  accessedRegion: {
    required:true,
    type:String
  },
  localTime: {
		type: String,
		required: true,
	},
  clientIp: {
    type: String,
    required: true,
  },
  usageCount: {
    imageGenerator: {
      type: Number,
      default: 0,
    },
    gptHandler: {
      type: Number,
      default: 0,
    },
    audioScriptor: {
      type: Number,
      default: 0,
    },
  },
  created: {
    type: Date,
    default: new Date(),
  }
});

const UserValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  accessedRegion: Joi.string().min(1).max(100),
  localTime: Joi.date().iso()
});

const UserLoginValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});



UserSchema.pre("save", async function userPasswordHash(next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
          } catch (error) {
      if(error instanceof Error){
        console.error(error.message);
      }
      next();
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
module.exports.UserValidationSchema = UserValidationSchema;
module.exports.UserLoginValidationSchema = UserLoginValidationSchema;