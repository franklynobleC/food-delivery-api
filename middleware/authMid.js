
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Middleware function to authenticate and authorize users
const authMiddleware = async (req, res, next) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization
    let check = authHeader.startsWith('Bearer ')
    console.log(check)
    console.log(authHeader)
    // Check if the authorization header exists
    if (!authHeader && !check) {
      console.log(authHeader, 'From Header')
      return res.status(401).json({ message: 'Unauthorized invalid  header' })
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1]
    console.log(token, 'From Token')

    // Verify the token

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedToken, 'From Decode  Token')
    // Check if user is authenticated
    if (!decodedToken) {
      console.log(decodedToken, 'from Decode  Token')
      return res.status(401).json({ message: 'Unauthorized token maybe changed' })
    }
    console.log(decodedToken, 'from Decode  Token Success')

    // Check if user is authorized
    if (decodedToken.role !== 'admin' && decodedToken.role !== 'user') {
      return res.status(403).json({ message: 'Forbidden' })
    }

    // Pass the authenticated and authorized user to the next middleware or route
    req.user = decodedToken
    next()
  } catch (error) {
    console.log(error)
return res.status(401).json({ message: 'Unauthorized not found  maybe' })
  }
}

module.exports = authMiddleware
