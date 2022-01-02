const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
router.get("/getUsers", async (req, res) => {
  try {
    const user = User.find({}, (error, data) =>
      error ? res.send(error) : res.send(data)
    );
  } catch (err) {
    res.status(422).send(err.message);
  }
});
module.exports = router;
