const express = require("express");
const User = require("../models/User");
const validateUser = require("../validations/userValidation");
const {
  hashpassword,
  verifypassword,
} = require("../validations/hashingPassword");
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

// Add a new user
router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(404).json({ error: error.details[0].message });

    const existinguser = await User.findOne({ email: req.body.email });
    if (existinguser)
      return res.status(404).json({ message: "User already exist" });

    const hashpass = await hashpassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashpass,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "Invalid Email" });

    const validPassword = await verifypassword(req.body.password, user.password);
    if (!validPassword)
      return res.status(404).json({ message: "Invalid Password" });

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
