const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { json } = require('stream/consumers')
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

const getSingleUser = async (req, res) => {
  const { id } = req.params

  const singleUser = await UserSchema.findById(id)

  if (!singleUser || singleUser.length === 0) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'No Data Found In Database' })
  }

  res.status(StatusCodes.OK).json({ user: { singleUser } })
}

//TODO
//addUpdate Functionality
const updateSingleUser = async (req, res) => {
  const { id } = req.params

  const updateSingleUser = await UserSchema.findByIdAndUpdate(id, req.body, {
    new: true
  })

  if (!updateSingleUser || updateSingleUser.length === 0) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'cant Perform Update, No Data Found In Database, ' })
  }
}

module.exports = {
  getAllUsers,
  getSingleUser
}
