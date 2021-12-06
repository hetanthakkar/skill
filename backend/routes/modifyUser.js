const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
router.post("/modifyUser", async (req, res) => {
  const { token, data } = req.body;
  try {
    console.log("token is", token);
    User.findOneAndReplace({ password: token }, data, null, (error, data) =>
      error ? res.send(error) : res.json("success")
    );
  } catch (err) {
    res.status(422).send(err.message);
  }
});
module.exports = router;
