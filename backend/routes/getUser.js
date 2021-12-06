const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
router.post("/getUser", async (req, res) => {
  const { token } = req.body;
  try {
    const user = User.findOne({ password: token }, (error, data) =>
      error ? res.send(error) : res.send(data)
    );
  } catch (err) {
    res.status(422).send(err.message);
  }
});
module.exports = router;
