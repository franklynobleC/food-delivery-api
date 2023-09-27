const { isTokenValid } = require('../utils')

//authenticate to check  if  user is  present in

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new error('Authentication  Invalid')
  }
  //check  if  the token is valid

  try {
    const { name, userId, role } = isTokenValid({ token })
    req.user = { name, userId, role }
   console.log(req.user.role)
    next()
  } catch (error) {
    console.log(error)
    throw new error('Authentication  Invalid')
  }
}

const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new error('Unauthorized to access this route')
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  authorizedPermissions
}
