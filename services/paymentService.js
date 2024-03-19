require('dotenv').config()
var paystack = require('paystack')(process.env.PAYSTACK_API_SECRET_KEY)
//add payment  functionality
const PaymentSchema = require('../models/Payment')
const OrderSchema = require('../models/Order')

//TODO: change  the secrete to  production
//Note: check  of  payment Option is cash  or card

let DataUrlLink = {
  paymentUrl: ''
}

/**
 * The `makePayment` function is an asynchronous function that handles payment processing based on the
 * payment option selected (card or cash) and returns the payment details.
 * @param email - The email of the user making the payment.
 * @param amount - The amount parameter represents the payment amount in a specific currency.
 * @param orderId - The `orderId` parameter is the unique identifier of the order for which the payment
 * is being made.
 * @param paymentOption - The `paymentOption` parameter is a string that specifies the payment method
 * chosen by the user. It can have two possible values: "card" or "cash".
 * @returns The function `makePayment` returns a Promise that resolves to a JSON string. The returned
 * value depends on the `paymentOption` parameter. If `paymentOption` is 'card', the function returns
 * the authorization URL for the payment. If `paymentOption` is 'cash', the function returns the
 * created payment object as a JSON string.
 */

const makePayment = async (email, amount, orderId, paymentOption) => {
  if (paymentOption === 'card') {
    try {
      const response = await paystack.transaction.initialize({
        email: email,
        amount: amount * 100,
        publicKey: process.env.PAYSTACK_API_PUBLICK_KEY,
        callback_url: 'https://paystacktest.com'
      })
      console.log('RESPONSE BODY', response.body)
      console.log('FROM API EVENT  TEST >>??????????', response.event)

      const { reference } = await response.data
      console.log('from respons Data services', response)
      console.log('from respons Data services', response.data)
      DataUrlLink.paymentUrl = await response.data.authorization_url

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

      console.log(paymentToDb.data, 'FROM DATABASE')
      console.log(paymentToDb, 'FROM DATABASE')
      //TODO:send  email to users about item  placed and the Payment Option  they have selected
      //const createPayment = await paystack.transaction.verify(response.data.reference)
      // await paymentCheckOut(response.data.authorization_url)

      return JSON.stringify(response)
    } catch (error) {
      console.log(error)
      console.error(error)
    }
  }

  //TODO:REMOVE  PAYMENT  WITH CASH from  DATABASE
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
        amount,
        //status: response.data.status,
        order: orderDetails,
        paymentOption
      })
      DataUrlLink.paymentUrl = 'Payment with  cash is initialized'
      //TODO: send  email to users about item  placed and the Payment Option  they have selected

      return paymentToDb
    } catch (error) {
      console.log('OBJECT CAST WERE  THE eRROR  IS hAPPENING')
      console.error(error)
    }
  }
}

/**
 * The function generates a checkout URL by converting a payment URL to a JSON string.
 * @returns The function `generateCheckoutUrl` returns a JSON string representation of the value stored
 * in the `DataUrlLink.paymentUrl` variable.
 */
const generateCheckoutUrl = () => {
  return DataUrlLink.paymentUrl
}
// const paymentWebHook = async (req, res) => {
//   //

// }

const paymentWebHook = async (req, res) => {
  try {
    // Extract necessary information from the webhook payload
    const { reference, status } = req.body

    // Handle the payment status
    if (status === 'success') {
      // Payment was successful
      // Send a success message to the frontend
      console.log('THIS IS  FROM  PAYMENT  WEBHOOK reference', reference)
      res.status(200).json({ message: 'Payment successful' })
    } else if (status === 'failed') {
      // Payment failed
      // Send a failure message to the frontend
      console.log('THIS IS  FROM  PAYMENT  WEBHOOK reference',status)

      res.status(200).json({ message: 'Payment failed' })
    } else {
      // Unknown payment status
      // Send an error message to the frontend
      console.log('THIS IS  FROM  PAYMENT  WEBHOOK reference', status)

      res.status(400).json({ message: 'Unknown payment status' })
    }
  } catch (error) {
    // Handle any errors that occur during webhook processing
    console.log('THIS IS  FROM  PAYMENT  WEBHOOK reference', error)

    console.error(error)
    res.status(500).json({ message: 'Error processing webhook' })
  }
}

const verifyPaymentTransaction = async ref => {}
module.exports = {
  makePayment,
  generateCheckoutUrl,
  paymentWebHook,
}
