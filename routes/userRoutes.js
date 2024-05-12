const express = require("express")
const User = require("../models/User")
const router = express.Router()


// Get list of users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({"message": "Fetched users successfully", "users": users})
    } catch (error) {
        res.status(500).json({"message": error.message[0]})
    }
})