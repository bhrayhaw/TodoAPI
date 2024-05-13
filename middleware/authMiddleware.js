const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    res.status(401).json({ message: "Access Denied: No token found" });

  try {
    const verifiedUser = jwt.verify(token, config.get("jwtSecret"));
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid Token" });
  }
};
