const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const { authValidation } = require("../validations/userValidation");
const { validateUser } = require("../validations/userValidation");
const {
  hashpassword,
  verifypassword,
} = require("../validations/hashingPassword");
const { sendVerificationEmail } = require("../services/email");
const router = express.Router();

// Add a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(404).json({ error: error.details[0].message });

    const existinguser = await User.findOne({ email });
    if (existinguser)
      return res.status(404).json({ message: "User already exist" });

    const hashpass = await hashpassword(password);

    const newUser = new User({
      username,
      email,
      password: hashpass,
    });

    await newUser.save();
    const token = newUser.getAuthToken();
    const verificationLink = `${config.get(
      "baseURL"
    )}/api/auth/verify/${token}`;
    sendVerificationEmail(email, verificationLink);
    res.status(201).json({
      message:
        "Registration Successful. Please check your email to verify your account",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify Email
router.get("/auth/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    if (!decoded || !decoded.email) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
});

// Authenticate users
router.post("/login", async (req, res) => {
  try {
    const { error } = authValidation(req.body);
    if (error) return res.status(400).json({ message: "Invalid request" });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "Invalid Email" });

    const validPassword = await verifypassword(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(404).json({ message: "Invalid Password" });

    const token = user.getAuthToken();

    res.header("x-auth-token").send(token);

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
