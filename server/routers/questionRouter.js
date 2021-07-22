const router = require('express').Router()
const Question = require('../models/questionModel')
const auth = require('../middleware/auth')

// Add a new question

router.post('/add', auth, async (req, res) => {
  try {
    const { title, content, questionCreator } = req.body

    // access to user id that did the request, through req.user

    const newQuestion = new Question({
      title,
      content,
      questionCreator,
    })

    const savedQuestion = await newQuestion.save()

    res.json(savedQuestion)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

// Return all questions

router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

module.exports = router
