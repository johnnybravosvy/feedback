const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/routes");
const CreateAdmin = require("./routes/default");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);

mongoose
    .connect("mongodb://localhost/feedback")
    .then(async () => {
        console.log("=======================");
        console.log("Connected to mongoDB...");
        console.log("=======================");
        await CreateAdmin();
    })
    .catch((err) => console.error(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
