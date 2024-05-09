const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const router = express.Router();

const middleware = (req, res, next) => {
    console.log("Middleware is working");
    next();
};

// router.use(middleware);

/**************************************
 * @param = This is to Register a User
 */
router.post("/register", async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (!username) {
        return res.status(400).json({
            success: false,
            message: `Username is required`,
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: `Password is required`,
        });
    }

    //  To Check if this user exists already
    const checkUser = await User.findOne({
        username: username.toLowerCase().trim(),
    });

    if (checkUser) {
        // ! You can determine how your responses will or should be
        return res.status(409).json({
            success: false,
            message: `User with ${username} already exists`,
        });
    }

    // Check if Passwords match

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: `Passwords do not match`,
        });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save to Database
    await User.create({
        username,
        password: hashPassword,
    });

    // This is where you send the email after registration

    return res.status(201).json({
        success: true,
        message: `An email has been sent to => ${username}`,
    });
});

module.exports = router;
