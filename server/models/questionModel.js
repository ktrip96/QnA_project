const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  keywords: [String],
  questionCreator: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  answers: [
    {
      answerCreator: String,
      answerContent: String,
      answerLikes: Number,
      answerDate: Date,
    },
  ],
})

const Question = mongoose.model('questions', questionSchema)

module.exports = Question
