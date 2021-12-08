const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    User.findOne({ email }, (error, data) => {
      if (data) res.send(data);
      else res.send(null);
    });
  } catch (err) {
    res.status(422).send(err.message);
  }
});
module.exports = router;
