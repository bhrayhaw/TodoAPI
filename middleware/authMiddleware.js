const jwt = require("jsonwebtoken");
const config = require("config");
const User = require('../models/User')

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token found" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Access Denied: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
