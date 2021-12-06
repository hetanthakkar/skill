const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
router.post("/signup", async (req, res) => {
  const { email, password, name, profilePhoto } = req.body;
  try {
    const user = new User({ email, password, name, profilePhoto });
    await user.save();
    res.json("saved");
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
});
module.exports = router;
