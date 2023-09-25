const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { json } = require('stream/consumers')
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

  //TODO
  //check  if user Already exist,
  //check  if registered User  is'admin Or 'user''
  const createUser = await UserSchema.create({
    name,
    email,
    password,
    deliveryAddress
  })

  res.status(StatusCodes.CREATED).json({ user: createUser })
}

//TODO

//add userLogin       Method

//TODO

//addUserLogOut  method
module.exports = {
  register
}
