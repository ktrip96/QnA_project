const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()

// Set up the server

const app = express()

// select the port for heroku or 5000 for local development
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))

// ** applied middlware for every request **
// converts text request => json request
app.use(express.json())
// Parses the cookies into JSON object
app.use(cookieParser())

// Connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.error(err)
    console.log('Connected to MongoDB')
  }
)

// Set up routes

app.use('/auth', require('./routers/userRouter'))
app.use('/question', require('./routers/questionRouter'))
