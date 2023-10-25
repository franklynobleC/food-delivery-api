require('dotenv').config()
var paystack = require('paystack')(process.env.PAYSTACK_API_SECRET_KEY)
//add payment  functionality
const PaymentSchema = require('../models/Payment')
const OrderSchema = require('../models/Order')

//TODO: change  the secrete to  production
//Note: check  of  payment Option is cash  or card
const makePayment = async (email, amount, orderId, paymentOption) => {
  if (paymentOption === 'card') {
    try {
      const response = await paystack.transaction.initialize({
        email: email,
        amount: amount * 100,
        publicKey: process.env.PAYSTACK_API_PUBLICK_KEY,
        callback_url: 'https://paystacktest.com'
      })
      const { reference } = await response.data
      console.log(response)
      console.log('FROM API')

      const orderDetails = await OrderSchema.findOne({ _id: orderId })
      console.log('PAYMENT WITH CARD>>>')
      console.log(orderDetails, 'FROM ORDER')
      if (!orderDetails) {
        res
          .status(400)
          .json({ message: 'Failed!  no order id found in database' })
      }
      const paymentToDb = await PaymentSchema.create({
        transactionId: reference,
        amount: amount,
        status: response.data.status,
        order: orderDetails,
        paymentOption: paymentOption
      })
      console.log(paymentToDb, 'FROM DATABASE')
      //TODO:send  email to users about item  placed and the Payment Option  they have selected
      //const createPayment = await paystack.transaction.verify(response.data.reference)

      return JSON.stringify(response)
    } catch (error) {
      console.log(error)
      console.error(error)
    }
  }
  if (paymentOption === 'cash') {
    try {
      const orderDetails = await OrderSchema.findOne({ _id: orderId })
      console.log(orderDetails, 'FROM ORDER')
      if (!orderDetails) {
        res
          .status(400)
          .json({ message: 'Failed!  no order id found in database' })
      }
      //generate   customize tran Id for for  cash Payment
      const paymentToDb = await PaymentSchema.create({
        transactionId: 'generate tran  id with Dat  func',
        amount: amount,
        //status: response.data.status,
        order: orderDetails,
        paymentOption: paymentOption
      })
      console.log('PAYMENT WITH cash>>>>')

      console.log(paymentToDb, 'FROM DATABASE')
      //TODO: send  email to users about item  placed and the Payment Option  they have selected

      return JSON.stringify(paymentToDb)
    } catch (error) {
      console.log(error.message)
      console.error(error)
    }
  }
}
const verifyPaymentTransaction = async ref => {}
module.exports = {
  makePayment
}
