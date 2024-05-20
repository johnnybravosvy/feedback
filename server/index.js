const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { User } = require("./models/users");
const { AdminRouter } = require("./routes/auth");
const { userRouter } = require("./routes/User");
const { feedbackRouter } = require("./routes/feedback");

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
dotenv.config();

app.use("/auth", AdminRouter);
// app.use("/user", userRouter);
// app.use("/feedback", feedbackRouter);

mongoose
    .connect("mongodb://localhost/feedback")
    .then(() => console.log("connected to mongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDb..."));

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

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
