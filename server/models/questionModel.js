const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  keywords: [String],
  questionUser: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const Question = mongoose.model('questions', questionSchema)

module.exports = Question
