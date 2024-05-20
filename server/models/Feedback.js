const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  rating: { type: String, required: true },
  comments: { type: String, required: true },
});

const feedback = mongoose.model("Feedback", feedbackSchema);

exports.Feedback = feedback;
