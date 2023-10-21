//import  all  files from  this  file

const { isTokenValid, createJWT, attachCookiesToResponse } = require('./jwt')
const checkPermissions = require('./checkPermissions')
const createTokenUser = require('./createTokenUser')
const  sendResetPasswordEmail = require('./sendResetPasswordEmail')
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendResetPasswordEmail
}
