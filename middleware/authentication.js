const { isTokenValid } = require('../utils')

//authenticate to check  if  user is  present in

/**
 * The `authenticateUser` function is a middleware that checks if a user is authenticated by verifying
 * their token and assigns the user's name, userId, and role to the request object.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information about the request, such as the request headers, request body, request
 * method, request URL, and more.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send the
 * response back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically called at the end of the `authenticateUser`
 * function to indicate that the authentication process is complete and the next middleware function
 * should be called.
 */
//TODO:handle errors safely with out crashing The App
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  console.log(" this is from Authenticate User",token)

  if (!token) {
    console.log("Authenticate Error",token)
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
/**
 * The function `authorizedPermissions` checks if the user's role is included in the authorized roles
 * and throws an error if not.
 * @param roles - The `roles` parameter is a rest parameter that allows you to pass in multiple roles
 * as arguments to the `authorizedPermissions` function. It collects all the arguments into an array
 * called `roles`.
 * @returns The function `authorizedPermissions` returns another function.
 */

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
