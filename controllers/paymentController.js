const { StatusCodes } = require('http-status-codes')
const PaymentSchema = require('../models/Payment')
const { makePayment } = require('../service/paymentService')
const createPayment = async (req, res) => {
  console.log('create  Payment function')
  const { email, amount,orderId } = req.body
  if (!email || !amount) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'please provide  the required  fields, email,  and  amount'
    })
  }
  const result = await makePayment(email, amount,orderId)
  console.log('all Data sent from  payment')

  //const refId = await result.data.reference

  // const { reference } = await result.data
  //   const {  data: {status, currency, description, reference, createdAt, updatedAt
  // } = await result.data

  res
    .status(StatusCodes.CREATED)
    .json({ result, message: 'payment successful' })
}

module.exports = {
  createPayment
}
