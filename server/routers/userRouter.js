const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body

    // validation

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' })

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: 'Please enter a password of at least 6 characters.',
      })

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: 'Please enter the same password twice.',
      })

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({
        errorMessage: 'An account with this email already exists.',
      })

    // Hash the password
    // Salt is a random string which is generated in order for the password to be hashed

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Save the user

    const newUser = new User({
      email,
      passwordHash,
    })
    const savedUser = await newUser.save()

    // Log the user in

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    )

    // send the token in a HTTP only cookie

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' })

    // check if the user exists

    const existingUser = await User.findOne({ email })

    // if not return 401

    if (!existingUser)
      return res
        .status(401)
        .json({ errorMessage: 'Wrong username or password' })

    // Else, compare the given password with the stored hashed password
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    )

    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: 'Wrong username or password' })

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    )

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

router.post('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send()
})

router.get('/isLoggedIn', (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) return res.send(false)
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    res.send(true)
  } catch (err) {
    res.send(false)
  }
})
module.exports = router
