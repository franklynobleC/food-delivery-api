let jwt = require('jsonwebtoken')

require('dotenv').config()

//create jsonwebtoken

const createJWT = ({ payload }) => {
  console.log('createJWT func')
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
  return token
}

//check if  token  is valid
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)
console.log(process.env.JWT_SECRET)

// this takes response and  user  object
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user })

  const oneDay = 100 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    signed: true,
    expire: new Date(Date.now() + oneDay)
  })
}

module.exports = {
  attachCookiesToResponse,
  createJWT,
  isTokenValid
}
