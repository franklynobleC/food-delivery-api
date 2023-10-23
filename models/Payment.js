const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['NGN', 'USD'],
    default: 'NGN'
  },
  email: {
type:String
  },
  orderId: {
    type:String,
  },

  paymentStatus: {
    type: String,
    required: [true, 'please  provide  payment  status'],
    default: 'pending'
  },
  paymentAmount: {
    type: Number,
    required: [true, 'amount can  not  be  empty.  please  provide  amount'],
    default:200
  }
})
module.exports = mongoose.model('Payment', PaymentSchema)