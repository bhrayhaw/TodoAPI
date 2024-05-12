const express = require("express")
const users = require("../routes/userRoutes")


module.exports = function (app) {
    app.use(express.json())
    app.use("/users", users)
}