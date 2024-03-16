// const admin = require('../config/firebase-config')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Middleware {
  async decode (req, resp, next) {
    try {
      // Get the authorization header from the request
      const authHeader = req.headers.authorization
      let check = authHeader.startsWith('Bearer ')
      console.log('CHECKING  SECRET', check)
      console.log(authHeader)
      // Check if the authorization header exists
      if (!authHeader && !check) {
        console.log(authHeader, 'From Header')
        return res.status(401).json({ message: 'Unauthorized invalid  header' })
      }

      // Extract the token from the authorization header
      const token = authHeader.split(' ')[1]
      console.log('From Token',token)

      let decodedToken = jwt.verify(token, process.env.JWT_SECRET_SUPABASE)
      const { email, role } = decodedToken

      req.user = { email, role }

      console.log(decodedToken, 'From Decode  Token>>>>>>>>|||||')
      return next()
    } catch (error) {
      console.log(error)

      return resp.json({ message: error.message })
    }
  }
  authorizePermissions = (...roles) => {
    return (req, res, next) => {
      console.log('Auth method works authorization', req.user.email)
      if (
        roles.includes(req.user.email) &&
        req.user.email === 'essienfrankudom@gmail.com'
      ) {
        console.log('AUTH PASSED!!')
        return next()
      } else {
        // )
        console.log('Unauthorize to access This Route!!')
        return 'Unauthorized to access this route'
      }
    }
  }
}

module.exports = new Middleware()
