import { User } from "./models/users";
import { AdminRouter } from "./routes/auth";
import { userRouter } from "./routes/User";
import { feedbackRouter } from "./routes/feedback";

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const admin = require("./models/Admin");
const app = express();

app.use(express.json());
app.use("/admin", admin);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
dotenv.config();
app.use("/auth", AdminRouter);
app.use("/user", userRouter);
app.use("/feedback", feedbackRouter);

app.get("/dashboard", async (req, res) => {
  try {
    const user = await User.countDocuments();
    const admin = await Admin.countDocuments();
    const feedback = await Feedback.countDocuments();
    return res.json({ ok: true, user, feedback, admin });
  } catch (err) {
    return res.json;
  }
});

mongoose
  .connect("mongodb://localhost/feedback")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb..."));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
