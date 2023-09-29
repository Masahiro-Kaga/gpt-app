import User from "@models/User.model"

const validateUser = async() => {
    const invalidArr = [];
    const existingUser = await User.findOne({username});
    if (existingUser){
        invalidArr.push("This user is already registered.")
    }
}

export default {validateUser,};