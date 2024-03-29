const mongoose = require('mongoose')

const validator = require('validator')
const Bcrypt = require('bcryptjs')
/* The code is defining a Mongoose schema for a user. It specifies the structure and validation rules
for the user object. */

//NOTE: This  schema  is  to store user Data, Note, The Password and  email is  managed  by  3rd Party Auth  fireBase,  the Schema  is  just  to Store All user Details
// TODO: // make  sure to implement customer's Delivery Address and Customer's   phone Number
UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
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
  phone: {
    type: Number,
    required: false,
    minlength: 11,
    maxHeight: 11
  },

  deliveryAddress: {
    type: String,
    required: [false, 'please provide  Delivery Address'],
    minlength: 5
  },
  password: {
    type: String,
    require: [true, 'please provide password'],
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
  },
  verified: Date,
  passwordToken: {
    type: String
  },
  passwordTokenExpirationDate: {
    type: Date
  }
})

/* The code `UserSchema.pre('save', async function () { ... })` is a pre-save hook in Mongoose. It is a
middleware function that is executed before saving a user object to the database. */
UserSchema.pre('save', async function () {
  //check  if  password  is changed, if  modified

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

// UserSchema.pre('save', async function () => {

//   TODO
//hash The Password field,  using BCrypt.
// if  password  is Modified, Implement change
//Also  check  if  password  is Modified

module.exports = mongoose.model('User', UserSchema)
