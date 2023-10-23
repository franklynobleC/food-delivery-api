const { StatusCodes } = require('http-status-codes')
const paymentSchema = require('../models/Payment')
const { makePayment } = require('../service/paymentService')
const createPayment = async (req, res) => {
  console.log('create  Payment function')
  const { email, amount } = req.body
  if (!email || !amount) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'please provide  the required  fields, email,  and  amount'
    })
  }
  const result = await makePayment(email, amount)
  console.log(result)
  res
    .status(StatusCodes.CREATED)
    .json({ result, message: 'payment successful' })
}

module.exports = {
  createPayment
}
