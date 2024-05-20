const express = require("express");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const { verifyAdmin } = require("../models/users");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const registerData = req.body;
        const user = await User.findOne(registerData.username);
        if (user) {
            return res.json({ message: "User is registered" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashPassword,
            email,
        });
        await newUser.save();
        return res.json({ registered: true });
    } catch (err) {
        return res.json({ message: "Error in registering user" });
    }
});

module.exports = router;
