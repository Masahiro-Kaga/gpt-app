import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
  // Dateにすると自動でUTCになるもんで。
  created: {
		type: String,
		required: true,
	},
});

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