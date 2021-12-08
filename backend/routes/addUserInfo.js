const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
router.post("/getUser", async (req, res) => {
  const { token, data } = req.body;
  try {
    const user = new User({
      email,
      password,
      name,
      profilePhoto,
      role,
      skills,
      specificSkills,
      location,
    });
    console.log("user", user);
    await user.save();
    res.json("saved");
  } catch (err) {
    res.status(422).send(err.message);
  }
});
module.exports = router;
