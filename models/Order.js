const mongoose = require('mongoose')

const SingleOrderItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: String,

    required: [true, 'amount can  not  be Empty please provide amount']
  },
  quantity: {
    type: Number,
    required: [true, 'quantity can  not  be Empty please provide quantity']
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  }
})
const OrderSchema = new mongoose.Schema(
  {
    OrderItems: [SingleOrderItemSchema],
    totalQuantity: {
      type: Number,
      required: true
    },

    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending'
    },

    deliveryFee: {
      type: Number,
      required: [true, 'please provide Delivery fee, make sure type is number'],
      default: 200
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },

  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
