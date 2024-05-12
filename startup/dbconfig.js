const config = require("config");
const mongoose = require("mongoose");

module.exports = async function () {
  try {
    await mongoose.connect(config.get("uri"));
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error.message());
  }
};
