const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, default: "" },
  color: { type: String, default: "blue" },
  numberOfQuestions: { type: Number, default: 0 },
  numberOfAnswers: { type: Number, default: 0 },
  numberOfLikes: { type: Number, default: 0 },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
