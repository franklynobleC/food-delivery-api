const jwt = require('jsonwebtoken')
require('dotenv').config()

//set Authentication Middleware
const authenticationMiddleware = async (req, res, next) => {
  //check  header
  console.log('from Auth middleWare')
  console(req.headers)
  const authHeader = await req.headers.authorization || req.headers.Authorization
  console('Auth Header', authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new error('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload =  await jwt.verify(token, process.env.JWT_SECRET)
    //attach user to  route
    req.user = await { userId: payload.userId, name: payload.name }
    next()
  } catch (err) {
    throw new error('Authentication Invalid')
  }
}

module.exports = authenticationMiddleware
