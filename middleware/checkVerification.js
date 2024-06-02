const User = require("../models/User");

const checkVerified = async (req, res, next) => {
  try {
    // Check if req.user is populated and contains _id
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email to access this resource" });
    }

    // User is verified, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in checkVerified middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkVerified;
