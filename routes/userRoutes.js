const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get list of users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "Fetched users successfully", users: users });
  } catch (error) {
    res.status(500).json({ message: error.message[0] });
  }
});

// Get user by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
