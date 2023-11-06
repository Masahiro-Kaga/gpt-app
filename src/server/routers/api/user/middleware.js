// const User = require("@models/User.model");
const User = require("../../../models/User.model");

const validateUser = async (req, res, next) => {
  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.json({ pass: false, data: "Username already taken." });
  }
  next();
};

module.exports = validateUser;