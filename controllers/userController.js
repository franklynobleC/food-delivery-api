const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
// const { json } = require('stream/consumers')
const { attachCookiesToResponse, createTokenUser } = require('../utils/index')
require('dotenv').config()

//get All  users from Database
const getAllUsers = async (req, res) => {
  const users = await UserSchema.find({})

  console.log('ALL USERS DATA CALLED')

  if (!users || users.length === 0) {
    //throw new Error("No users Found in User's table")

    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'No Data Found In Database' })
    return
  }
  // console.log('type of  data ', typeof users)
  res.status(StatusCodes.OK).json(users)
}

/*
Get a Single User from  the Database Schema,(pass the id  from  postMan)
  */
const getSingleUser = async (req, res) => {
  const { id } = req.params
  console.log('Getting Single Data', id)

  console.log(req.user)
  const user = await UserSchema.findById(id)

  if (!user || user.length === 0) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'No Data Found In Database' })
  }

  res.status(StatusCodes.OK).json(user)
}

//TODO: MAKE SURE USER NAMES AND  ALL DETAILS ARE NOT NULL, ALSO, LINK USER NAME WITH ORDERS TABLE
//addUpdate a SingleUser's  name and  email Functionality

const updateUser = async (req, res) => {
  const { name, deliveryAddress, phone } = req.body
  const { id } = req.params
  console.log('update Data Called?>>>>>>>>>??????>>>>>', id)
  console.log(name, deliveryAddress, phone)

  console.log(
    'update Data Called?>>>>>>>>>??????>>>>>',
    name,

    deliveryAddress,
    phone
  )
  if (!name || !deliveryAddress || !phone) {
    console.log(
      'Please Provide All Required Fields',

      phone,
      deliveryAddress,
      name
    )
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please Provide All Required Fields' })
    return
  }
  console.log('update Single User', id)
  /* The code `const updateSingleUser = await UserSchema.findByIdAndUpdate(id, req.body, { new: true })`
is updating a single user in the database. */
  //NOTE: UNCOMMENT  THIS AND  PASS  THE  ID  THROUGH THE REQUEST   BODY TO  THE DB
  // const userFromDb = await UserSchema.findOne({ _id: req.user.userId })
  //check  if  user Email  is already registered
  TODO: userFromDb = await UserSchema.findOne({ _id: id })

  userFromDb.name = name
  userFromDb.deliveryAddress = deliveryAddress
  userFromDb.phone = phone
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

  console.log('newPassword', newPassword, 'OldPassword', oldPassword)
  if (!newPassword || newPassword.length === 0 || !oldPassword) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Password Cannot Be Empty' })
    return
  }
  // getThe User using  the UserId, (get  it from the request)

  // add error message to  be  more  readable for  password   change
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

const showCurrentUser = async (req, res) => {
  // console.log('SHOW CURRENT USER', req.user)
  console.log('SHOW CURRENT USER')
  res.status(StatusCodes.OK).json({ user: req.user })
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  console.log('Delete User')

  if (!id || id.length === 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Failed! please  insert valid id' })
  }

  const deleteUser = await UserSchema.findOneAndDelete({ _id: id })
  console.log(deleteUser)
  //  deleteUser
  if (!deleteUser || deleteUser === ull) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Failed!  user not id not FOUND  in Database' })
  }

  // deleteUser
  res.status(StatusCodes.OK).json({
    message: `"Successful! User with id ${
      (deleteUser._id, deleteUser.email)
    } Deleted"`
  })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  showCurrentUser,
  deleteUser
}
