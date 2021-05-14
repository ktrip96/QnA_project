const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// Set up the server

const app = express()
// select the port for heroku or 5000 for local development
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
app.get('/test', (req, res) => {
  res.send('It works')
})

// applied middlware for every request
// converts text request => json request
app.use(express.json())

// Connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err)
    console.log('Connected to MongoDB')
  }
)

// Set up routes

app.use('/auth', require('./routers/userRouter'))
