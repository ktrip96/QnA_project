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

    console.log({ token })

    // send the token in a HTTP only cookie

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send()

    res.send('Ok!')
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

module.exports = router
