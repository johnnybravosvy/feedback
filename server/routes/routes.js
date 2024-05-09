const express = require("express");
const router = express();

router.get("/admin", (req, res) => {
  res.send("");
});

module.exports = router;
