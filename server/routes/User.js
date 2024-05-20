const express = require("express");
import { User } from "../models/users";
const bcrypt = "bcrypt";
const router = express.Router();
import { verifyAdmin } from "./auth";

router.post("/register", verifyAdmin, async (req, res) => {
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

export { router as userRouter };
