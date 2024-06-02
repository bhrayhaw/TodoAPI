const express = require("express");
const users = require("../routes/userRoutes");
const auth = require("../routes/authRoutes");
const todo = require("../routes/todoRoutes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/", auth);
  app.use("/api/users", users);
  app.use("/api/todo", todo);
};
