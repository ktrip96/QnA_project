const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: { type: String, required: true, index: true },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
}).index({ content: "text" });

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  keywords: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  answers: [AnswerSchema],
}).index({ title: "text", keywords: "text", content: "text" });

const QnA = mongoose.model("qna", QuestionSchema);

module.exports = QnA;
