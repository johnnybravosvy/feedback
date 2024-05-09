const express = require("express");
const bcrypt = require("bcrypt");
const admin = require("adminModel");
import { DbConnect } from "./Mongodb";

async function AdminAccount() {
  try {
    await admin.init();
    const adminCount = await admin.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash("feedbackadmin", 10);
      const newAdmin = new admin({
        username: "admin",
        password: hashPassword,
      });
      await newAdmin.save();
      console.log("account created");
    } else {
      console.log("account already exist");
    }
  } catch (err) {
    console.log("unable to create admin");
  }
}
AdminAccount();
