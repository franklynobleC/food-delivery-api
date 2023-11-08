const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { json } = require('stream/consumers')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const {
  attachCookiesToResponse,
  createTokenUser,
  sendResetPasswordEmail,
  createHash
} = require('../utils')
const { error } = require('console')
const { emailFunc } = require('../services/mailService')
require('dotenv').config()

//add Register, Login,  logOut,
const register = async (req, res) => {
  console.log(req)
  const { email, password } = req.body

  //console.log(req.body, 'FROM  REQUEST BODY')
  console.log(email, password)

  if (!email || !password) {
    console.log('Registration Error!')
    //  throw new Error('Please fill all the fields')
    return res.status(StatusCodes.BAD_REQUEST).json({ error: res.error })
  }

  //
  if (email || password) {
    console.log(email, password)
    return
  }
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
    email,
    password
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
  res.status(StatusCodes.CREATED).json(tokenUser)
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

  console.log(email, password)
  const user = await UserSchema.findOne({ email })

  if (!user) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'no User found!, Invalid credentials' })
    return
    // throw new Error('no User found!, Invalid credentials')
  }
  const isPasswordCorrect = await user.checkPassword(password)
  if (!isPasswordCorrect) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message:
        'Invalid credentials, password does not  Match, Invalid credentials'
    })
    return
  }
  //if  password Matched,  add   user to Token
  const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json(tokenUser)
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
    const origin = 'http://localhost:5000/api/v1/auth/resetPassword'
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin
    })

    const tenMinutes = 1000 * 60 * 10
    const passwordTokenExpiresDate = Date.now(Date.now() + tenMinutes)
    user.passwordToken = createHash(passwordToken)
    user.passwordTokenExpirationDate = passwordTokenExpiresDate
    await user.save()
  }
  //**Note wether  or  not  the  email exists,  still send  a success message,  should  there be  any problem, with someone  trying  to hack  through  sending  mails through  user, the success  message would  give a  hard  time
  res.status(StatusCodes.OK).json({
    message: 'Successful! please check your email for password reset link'
  })
}
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body
  if (!token || !password || !email) {
    throw new Error(`please  provide all  values ${error}`)
  }
  const tenMinutes = 1000 * 60 * 10

  const user = await UserSchema.findOne({ email })
  if (user) {
    console.log(user)
    /* The code is creating two Date objects: `currentDate` and `tokenExpirationDate`.
compare Dates  to make sure  user   updates password  within a  given period  of 10minutes
    */
    const currentDate = new Date()
    const tokenExpirationDate = new Date(user.passwordTokenExpirationDate)

    if (
      user.passwordToken === createHash(token) &&
      tokenExpirationDate.getTime() + tenMinutes > currentDate.getTime()
    ) {
      console.log('all matched  now  move to  pass word  update')

      user.password = password
      user.passwordToken = null
      user.passwordTokenExpirationDate = null
      await user.save()
    } else {
      //send Email  that Token has expired,  user  should  reset  password
      console.log('token expired, please resend  reset  password')
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Failed! token Expired, please reset password' })
    }
    // console.log(user)
    //throw  new Error(`error occurred${error.toString()}`)
  }
  res
    .status(StatusCodes.OK)
    .json({ message: 'Success! pass word reset successful!' })
}

module.exports = {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword
}
