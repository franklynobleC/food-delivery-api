# food-delivery-api

### Project Overview

This is a food delivery api that allows users to create an account, login, place an order, and view their order history.

**pull to your local repo and run `npm install` to install Depencies**

## potfolio-project

### Built With

#### For Back-end

- node.js
- express
- mongoDB
- mongoose
- dotenv



### file structure

## TODO

#### For Front-end reactjs

- HTML & CSS
- React.js

### DB MODEL

- User Model
- Food Model
- Order Model

#### user  model
```
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'please  provide email'
    }
  },

  password: {
    type: String,
    require: true,
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

module.exports = mongoose.model('User', UserSchema)
```
#### food model
**import  mongoose
```


const FoodSchema = new mongoose.Schema(
  {
    name: {
      String,
      type: String,
      required: true,
      maxlength: [150, 'name can not be more than 150 characters']
    },
    price: {
      type: String,
      required: true,
      default: 0
    },
    description: {
      type: String,
      required: true,
      maxlength: [150, 'description can not be more than 150 characters']
    },
    //TODO :add image upload function
    image: {
      name:String,
      type: String
    },

    category: {
      type: String,
      enum: ['breakfast', 'dinner', 'protein'],
      default: 'dinner'
    },
    delivery: {
      type: Boolean,
      default: false
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
)

module.exports = mongoose.model('Food', FoodSchema)

```#### upload Images
 - install package express file  upload
 - express  to static