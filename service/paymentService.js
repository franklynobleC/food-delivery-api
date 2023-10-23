require('dotenv').config()
var paystack = require('paystack')(process.env.PAYSTACK_API_SECRET_KEY)
//add payment  functionality
const  PaymentSchema = require('../models/Payment')

const makePayment = async (email, amount) => {
  try {
    const response = await paystack.transaction.initialize({
      email: email,
      amount: amount * 100,
      publicKey: process.env.PAYSTACK_API_PUBLICK_KEY,
      callback_url: 'https://paystacktest.com'
    })
    const{reference}=  await response.data
    console.log(response)
console.log('FROM API')
const paymentToDb = await PaymentSchema.create({
  transactionId: reference,
  amount: amount,
  status: response.data.status
})
console.log(paymentToDb, 'FROM DATABASE')

    //const createPayment = await paystack.transaction.verify(response.data.reference)

    return JSON.stringify(response)
  } catch (error) {
    console.log(error)
    console.error(error)
  }
}
const verifyPaymentTransaction = async (ref) => {

}
module.exports = {
  makePayment,
}
