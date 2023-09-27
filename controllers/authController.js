const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { json } = require('stream/consumers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { attachCookiesToResponse } = require('../utils')
require('dotenv').config()

//add Register, Login,  logOut,
const register = async (req, res) => {
  console.log(req)
  const { name, email, password, deliveryAddress } = req.body

  //console.log(req.body, 'FROM  REQUEST BODY')

  if (!name || !email || !password || !deliveryAddress) {
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
  const createUser = await UserSchema.create({
    name,
    email,
    password,
    deliveryAddress
  })
  // add UserToken
  const tokenUser = {
    name: createUser.name,
    userId: createUser._id,
    role: createUser.role
  }

  res
    .status(StatusCodes.CREATED)
    .json({ user: tokenUser, message: 'User created' })
}

//TODO

//add userLogin       Method
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    console.log('Login Error!')

    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please fill all the fields' })
  }
  const singleUser = await UserSchema.findOne({ email })

  if (!singleUser) {
    throw new Error('no User found!, Invalid credentials')
  }
  const isPasswordCorrect = await singleUser.checkPassword(password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials, password does not  Match')
  }
  //if  password Matched,  add   user to Token
  const tokenUser = {
    name: singleUser.name,
    userId: singleUser._id,
    role: singleUser.role
  }
  attachCookiesToResponse({ res, tokenUser })

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
    res.status(StatusCodes.OK).json({ message: 'User logged out!' })
}

module.exports = {
  register,
  login,
  logout
}
