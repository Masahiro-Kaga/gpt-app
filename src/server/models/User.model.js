import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";
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
  accessedRegion: {
    required:true,
    type:String
  },
  // Date型にすると自動でUTCになってしまう。だからベットcreatedをさくせい。
  localTime: {
		type: String,
		required: true,
	},
  created: {
    type: Date,
    default: new Date(),
  }
});

export const UserValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  accessedRegion: Joi.string().min(1).max(100),
  localTime: Joi.date().iso()
});

export const UserLoginValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// requiredは上のスキーマで対応、エラーの出方がわかりやすい。

// export const UserValidationSchema = Joi.object({
//   username: Joi.string().min(3).max(30).required(),
//   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//   accessedRegion: Joi.string().min(1).max(100).required(),
//   localTime: Joi.date().iso().required()
// });

// // This使っているので、アロー関数は無理。
UserSchema.pre("save", async function userPasswordHash(next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
      // https://www.youtube.com/watch?v=pEbA46E7c7o
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

export default mongoose.model("User", UserSchema);