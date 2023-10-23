const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['NGN'],
    default: 'NGN'
  },
  email: {
    type: String
  },
  paymentStatus: {
    type: String,
    required: [true, 'please  provide  payment  status'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: [true, 'amount can  not  be  empty.  please  provide  amount'],

  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'order can not be empty. please provide order']
  }
})
module.exports = mongoose.model('Payment', PaymentSchema)
