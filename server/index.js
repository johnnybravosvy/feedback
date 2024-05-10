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

mongoose
  .connect("mongodb://localhost/feedback")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb..."));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
