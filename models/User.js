const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config")

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userschema.methods.getAuthToken = function () {
  const token = jwt.sign({ email: this.email }, config.get("jwtSecret"));
  return token;
};

const User = mongoose.model("User", userschema);

module.exports = User;
