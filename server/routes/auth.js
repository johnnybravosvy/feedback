const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/Admin");
const { User } = require("../models/users");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const logindata = req.body;
        if (logindata.role === "admin") {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.json({ message: "admin not registered" });
            }
            const validPassword = await bcrypt.compare(
                password,
                admin.password
            );
            if (!validPassword) {
                return res.json({ message: "wrong password" });
            }
            const token = jwt.sign(
                { username: admin.username, role: "admin" },
                process.env.Admin_key
            );
            res.cookie("token", token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: "admin" });
        } else if (logindata.role === "user") {
            const user = await User.findOne({ username });
            if (!user) {
                return res.json({ message: "user not registered" });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.json({ message: "wrong password" });
            }
            const token = jwt.sign(
                { username: user.username, role: "user" },
                process.env.User_key
            );
            res.cookie("token", token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: "user" });
        } else {
        }
    } catch (err) {
        res.json(err);
    }
});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Admin" });
    } else {
        jwt.verify(token, process.env.Admin_key, (err, decoded) => {
            if (err) {
                return res.json({ message: "Invalid token" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid User" });
    } else {
        jwt.verify(token, process.env.Admin_key, (err, decoded) => {
            if (err) {
                jwt.verify(token, process.env.User_key, (err, decoded) => {
                    if (err) {
                        return res.json({ message: "Invalid token" });
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next();
                    }
                });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

router.get("/verify", (req, res) => {
    return res.json({ login: true, role: req.role });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ logout: true });
});

module.exports = router;
