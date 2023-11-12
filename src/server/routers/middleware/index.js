
const { Configuration, OpenAIApi } = require("openai");
const User = require("../../models/User.model");



const openaiAuthorized = (req, res, next) => {
  try {
    if (!process.env.CHATGPT_APIKEY) {
      throw new Error("API key not found");
    }

    const configuration = new Configuration({
      apiKey: process.env.CHATGPT_APIKEY,
    });
    const openai = new OpenAIApi(configuration);

    if (!req.user) {
      req.user = {};
    }

    req.openaiAuth = openai;

    next();
  } catch (error) {
    res.status(500).json({ pass: false, data: error.message });
  }
};

const usageRestrictions = async (req, res, next) => {
  // Make sure there is a username in the session to look up the user.
  if (!req.session.username) {
    return res.status(401).json({ pass: false, data: "No session found." });
  }
  const user = await User.findOne({ username: req.session.username });

  // Check if the user was found.
  if (!user) {
    return res.status(404).json({ pass: false, data: "User not found." });
  }

  // Fetch the client IP address = require(the request headers or socket info.
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  
  // Optionally update the user's IP address if you want to keep track of it.
  // Consider the security and privacy implications of storing IP addresses.
  user.clientIp = clientIp;
  
  // Look for other users with the same IP.
  const accessUsersWithSameIP = await User.find({ clientIp });

  // Check if any of these users have exceeded usage.
  const isAnyoneOverUsage = accessUsersWithSameIP.some(
    (userRecord) => userRecord.usageCount[req.body.serviceType] > 0
  );

  // Get the usage count for the current serviceType for this user.
  const usageCount = user.usageCount[req.body.serviceType];

  // Perform the usage checks.
  if (user.userRole === "user") {
    if (usageCount > 0) {
      return res.json({ pass: false, data: "Over usage." });
    } else if (
      process.env.IP_RESTRICTION === "true" &&
      usageCount <= 0 &&
      isAnyoneOverUsage
      ) {
      return res.json({ pass: false, data: "Same IP." });
    }
  }

  // Attach the user object to the request so that subsequent middleware or route handlers can access it.
  req.user = user;

  // If all checks pass, call next() to continue to the next middleware or route handler.
  next();
};

module.exports = { openaiAuthorized, usageRestrictions };