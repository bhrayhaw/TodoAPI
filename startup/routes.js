const express = require("express")
const users = require("../routes/userRoutes")
const auth = require("../routes/authRoutes")


module.exports = function (app) {
    app.use(express.json())
    app.use("/api/users", users)
    app.use("/api/", auth)
}