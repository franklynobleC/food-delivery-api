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
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

UserSchema.pre('save', async function () {
  //check  if  password  is changed, of  modified

  if (!this.isModified('password')) return
  //generate salt and hash password
  const salt = await Bcrypt.genSalt(10)
  this.password = await Bcrypt.hash(this.password, salt)
})

//Before Save,
//check  if  the  password  matches,  is  yes
UserSchema.methods.checkPassword = async function (password) {
  const isMatch = await Bcrypt.compare(password, this.password)

  if (!isMatch) {
    throw new Error('error! wrong  password')
  }
  console.log('password matches')
  return isMatch
}

//UserSchema.pre('save', async function () => {

//   TODO
//hash The Password field,  using BCrypt.
// if  password  is Modified, Implement change
//Also  check  if  password  is Modified

module.exports = mongoose.model('User', UserSchema)
