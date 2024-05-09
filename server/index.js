const express = require("express");
const mongoose = require("mongoose");
const admin = require("./models/Admin");
const app = express();

app.use(express.json());
app.use("/admin", admin);

mongoose
  .connect("mongodb://localhost/feedback")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb..."));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
