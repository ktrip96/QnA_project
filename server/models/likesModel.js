const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  likes: [mongoose.Schema.Types.ObjectId],
});

const Likes = mongoose.model("like", LikesSchema);

module.exports = Likes;
