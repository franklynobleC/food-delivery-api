const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { json } = require('stream/consumers')

const { attachCookiesToResponse, createTokenUser } = require('../utils/index')
require('dotenv').config()

//get All  users from Database
const getAllUsers = async (req, res) => {
  const allUsers = await UserSchema.find({})

  if (!allUsers) {
    //throw new Error("No users Found in User's table")

    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'No Data Found In Database' })
  }

  res.status(StatusCodes.OK).json({ users: { allUsers } })
}

/*
Get a Single User from  the Database Schema,(pass the id  from  postMan)
  */
const getSingleUser = async (req, res) => {
  const { id } = req.params

  console.log(req.user)
  const singleUser = await UserSchema.findById(id)

  if (!singleUser || singleUser.length === 0) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'No Data Found In Database' })
  }

  res.status(StatusCodes.OK).json({ user: { singleUser } })
}

//TODO
//addUpdate a SingleUser's  name and  email Functionality
const updateUser = async (req, res) => {
  const { name, email } = req.body
  console.log(name, email)

  if (!name || !email) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please Provide All Required Fields' })
    return
  }
  console.log('update Single User')
  /* The code `const updateSingleUser = await UserSchema.findByIdAndUpdate(id, req.body, { new: true })`
is updating a single user in the database. */

  const userFromDb = await UserSchema.findOne({ _id: req.user.userId })
  userFromDb.email = email
  userFromDb.name = name

  await userFromDb.save()

  const tokenUser = createTokenUser(userFromDb)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({
    user: tokenUser,
    message: 'Successful! User name and email  updated'
  })
}
// this takes new password  and  old  password from  the  req.body
const updateUserPassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body

  console.log("newPassword",newPassword,  "OldPassword",oldPassword)
  if (!newPassword || newPassword.length === 0 || !oldPassword) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Password Cannot Be Empty' })
    return
  }
  // getThe User using  the UserId, (get  it from the request)

  const user = await UserSchema.findOne({ _id: req.user.userId })

  //check   if  password Matches
  const isPasswordMatched = await user.checkPassword(oldPassword)
  //const isPasswordMatched = await UserSchema.findOne({ password })
  if (!isPasswordMatched) {
    //return if password
    res.status(StatusCodes.BAD_REQUEST).jso({ message: 'Invalid Credentials' })
  }

  user.password = newPassword

  await user.save()

  res.status(StatusCodes.OK).json({ message: 'Success! Password Updated' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword
}
