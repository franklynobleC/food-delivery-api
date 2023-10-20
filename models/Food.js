const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema(
  {
    name: {
      String,
      type: String,
      required: [true, 'Please provide food  name'],
      maxlength: [150, 'name can not be more than 150 characters']
    },
    price: {
      type: String,
      required: [true, 'Please provide price'],
      default: 0
    },
    description: {
      type: String,
      required: [true, 'Please provide food description'],
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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  //TODO
  //add review schema relationship,  to reference
)

module.exports = mongoose.model('Food', FoodSchema)
