const { isTokenValid } = require('../utils/jwt')

const authenticateUser = async (req, res, next) => {
  let token
  // check header
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    console.log("ERRORs 1",token)
    // throw new CustomError.UnauthenticatedError('Authentication invalid')
  }
  try {
    const payload = isTokenValid(token)

    // Attach the user and his permissions to the req object
console.log('Authentication valid 1')
    console.log(payload)
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role
    }

    next()
  } catch (error) {
    console.log('Authentication invalid 2',error)
  }
}

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(
        'Unauthorized to access this route'
      )
    }
    next()
  }
}

module.exports = { authenticateUser, authorizeRoles }
