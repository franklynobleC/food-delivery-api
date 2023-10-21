const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { json } = require('stream/consumers')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const sendMail = require('../service/mailService')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
const { error } = require('console')
const { emailFunc } = require('../service/mailService')
require('dotenv').config()

//add Register, Login,  logOut,
const register = async (req, res) => {
  console.log(req)
  const { name, email, password, deliveryAddress, role } = req.body

  //console.log(req.body, 'FROM  REQUEST BODY')

  if (!name || !email || !password || !deliveryAddress || !role) {
    console.log('Registration Error!')
    //  throw new Error('Please fill all the fields')
    return res.status(StatusCodes.BAD_REQUEST).json({ error: res.error })
  }

  //
  //check  if user Already exist,
  const emailAlreadyExist = await UserSchema.findOne({ email })
  if (emailAlreadyExist) {
    throw new Error('Email already exist')
  }
  // TODO
  //check  if registered User  is'admin Or 'user''
  //TODO:  uncomment to send  email
  //await emailFunc(email,name)

  const createdUser = await UserSchema.create({
    name,
    email,
    password,
    deliveryAddress,
    role
  })

  //

  /*
  const token = jwt.sign(
    { userId: createUser._id, name: createUser.name, role: createUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  */

  // add UserToken
  const tokenUser = createTokenUser(createdUser)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

//TODO

//add userLogin       Method
const login = async (req, res) => {
  const { email, password } = req.body
  console.log(req.body, 'FROM  REQUEST BODY')
  if (!email || !password) {
    console.log('Login Error!')

    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please fill all the fields' })
  }
  const user = await UserSchema.findOne({ email })

  if (!user) {
    throw new Error('no User found!, Invalid credentials')
  }
  const isPasswordCorrect = await user.checkPassword(password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials, password does not  Match')
  }
  //if  password Matched,  add   user to Token
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, message: 'User logged in' })
}

//TODO

//attach Cookies to Response

//addUserLogOut  method
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
    signed: false
  }),
    console.log('user logged Out')
  res.status(StatusCodes.OK).json({ message: 'User logged out!' })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new error('please provide a  valid  email')
  }
  const user = await UserSchema.findOne({ email })
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex')
    //send  email
    const tenMinutes = 1000 * 60 * 10
    const passwordTokenExpiresDate = Date.now(Date.now() + tenMinutes)
    user.passwordToken = passwordToken
    user.passwordTokenExpirationDate = passwordTokenExpiresDate
    await user.save()
  }
  //**Note wether  or  not  the  email exists,  still send  a success message,  should  there be  any problem, with someone  trying  to hack  through  sending  mails through  user, the success  message would  give a  hard  time
  res
    .status(StatusCodes.OK)
    .json({
      message: 'Successful! please check your email for password reset link'
    })
}
const resetPassword = async (req, res) => {
  console.log('rest pass')

  res.send('reset password')
}

module.exports = {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword
}
