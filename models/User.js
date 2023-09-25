const mongoose = require('mongoose')

const validator = require('validator')
//const Bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: [true, 'please provide email address'],
    validate: {
      validator: validator.isEmail,
      message: 'please  provide email'
    }
  },

  password: {
    type: String,
    require: [true, 'please provide password'],
    minlength: 3
  },
  deliveryAddress: {
    type: String,
    required: false,
    minlength: 3
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

//Before Save,
//TODO
/*
//UserSchema.pre('save', async function () => {


  //   TODO
  //hash The Password field,  using BCrypt.
  // if  password  is Modified, Implement change
 //Also  check  if  password  is Modified
})
*/

module.exports = mongoose.model('User', UserSchema)
