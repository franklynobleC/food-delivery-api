require('dotenv').config()
var paystack = require('paystack')(process.env.PAYSTACK_API_SECRET_KEY)
//add payment  functionality

const makePayment = async (email, amount) => {
  try {
    const response = await paystack.transaction.initialize({
      email: email,
      amount: amount * 100,
      publicKey: process.env.PAYSTACK_API_PUBLICK_KEY,
      callback_url: 'https://paystacktest.com'
    })
    console.log(response.data)
    return JSON.stringify(response.data)
  } catch (error) {
    console.log(error)
    console.error(error)
  }
}

module.exports = {
  makePayment,
}
