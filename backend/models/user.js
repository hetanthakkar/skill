const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "teacher",
  },
  skills: {
    type: [String],
  },
  specificSkills: {
    type: [String],
  },
  location: {
    type: Object,
  },
});
mongoose.model("User", userSchema);
