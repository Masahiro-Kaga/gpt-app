import User from "@models/User.model"

export const validateUser = async(req,res,next) => {
    const existingUser = await User.findOne( {username:req.body.username} );
    console.log(existingUser)
    if (existingUser) {
        return res.json({ pass: false, data: "Username already taken." });
    }
    next();
}
