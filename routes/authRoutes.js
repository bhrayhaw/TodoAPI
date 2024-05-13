const express = require("express");
const { verifypassword } = require("../validations/hashingPassword");
const User = require("../models/User");
const { authValidation } = require("../validations/userValidation");
const router = express.Router();

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

    token = user.getAuthToken()

    res.header("x-auth-token").send(token)

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
