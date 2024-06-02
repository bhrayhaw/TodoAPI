const config = require("config");
const mongoose = require("mongoose");
const Scheduler = require('../services/scheduler')

module.exports = async function () {
  try {
    await mongoose.connect(config.get("uri"));
    console.log("Connected to mongodb");
    Scheduler()
  } catch (error) {
    console.log(error.message[0]);
  }
};
