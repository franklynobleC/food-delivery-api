let jwt = require('jsonwebtoken')

require('dotenv').config()

//create jsonwebtoken

/**
 * The function `createJWT` generates a JSON Web Token (JWT) with a given payload and returns the
 * token.
 * @returns The function `createJWT` returns a JSON Web Token (JWT) that is generated using the
 * `jwt.sign` method.
 */

const createJWT = ({ payload }) => {
  console.log('createJWT func')
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
  return token
}

//check if  token  is valid
/**
 * The function `isTokenValid` checks if a given token is valid by verifying it using a JWT secret
 * stored in the environment variable `JWT_SECRET`.
 */
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)
console.log(process.env.JWT_SECRET)

// this takes response and  user  object
/**
 * The function attaches a JWT token as a cookie to the response object with a one-day expiration time.
 */
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user })

  const oneDay = 100 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    signed: true,
    expire: new Date(Date.now() + oneDay)
  })
  return { token }
}

module.exports = {
  attachCookiesToResponse,
  createJWT,
  isTokenValid
}
