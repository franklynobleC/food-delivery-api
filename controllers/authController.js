const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { json } = require('stream/consumers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const  sendMail = require('../service/mailService')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
require('dotenv').config()
const emailFunc = async (email, name) => {
const response = await sendMail(email, name)
 return JSON.stringify(response)
}
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
  await emailFunc(email,name)

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

module.exports = {
  register,
  login,
  logout
}
