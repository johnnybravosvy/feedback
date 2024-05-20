const express = require("express");
import { Feedback } from "../models/Feedback";
const bcrypt = "bcrypt";
const router = express.Router();
import { verifyAdmin } from "./auth";

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { username, email, rating, comments } = req.body;
    const newFeedback = new Feedback({
      username,
      email,
      rating,
      comments,
    });
    await newFeedback.save();
    return res.json({ added: true });
  } catch (err) {
    return res.json({ message: "Error in adding feedback" });
  }
});

router.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    return res.json(feedbacks);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/feedback/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findById({ _id: id });
    return res.json(feedback);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/feedback/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findByIdAndUpdate({ _id: id }, req.body);
    return res.json({ updated: true, feedback });
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/feedback/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findByIdAndDelete({ _id: id }, req.body);
    return res.json({ deleted: true, feedback });
  } catch (err) {
    return res.json(err);
  }
});

export { router as feedbackRouter };
