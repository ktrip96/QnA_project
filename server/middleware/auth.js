const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  try {
    const token = req.cookies.token

    // If you don't have token, then you are not authorized to do the API call
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' })

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified.user

    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ errorMessage: 'Unauthorized' })
  }
}

module.exports = auth
