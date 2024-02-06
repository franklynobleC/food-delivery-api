const { StatusCodes } = require('http-status-codes')
const PaymentSchema = require('../models/Payment')
const { makePayment } = require('../services/paymentService')

const createPayment = async (req, res) => {
  console.log('create  Payment function')
  const { email, amount, order } = req.body
  if (!email || !amount) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'please provide  the required  fields, email,  and  amount'
    })
  }
  const result = await makePayment(email, amount, order)
  //TODO:send Email To User After Payment
  //const refId = await result.data.reference

  // const { reference } = await result.data
  //   const {  data: {status, currency, description, reference, createdAt, updatedAt
  // } = await result.data

  res
    .status(StatusCodes.CREATED)
    .json({ result, message: 'payment successful' })
}

const getAllPayments = async (req, res) => {
  const payments = await PaymentSchema.find({})
     console.log('All payments routes called')
  if (!payments) {
    res
      .stat(StatusCodes.NOT_FOUND)
      .json({ message: 'Failed!, no data found  in  payments Db' })
  }

  res.status(StatusCodes.OK).json({ payments: payments })
}

const getSInglePayment = async (req, res) => {
  const { id: paymentId } = req.params

  const findSinglePayment = await PaymentSchema.findById({ _id: paymentId })
  if (!findSinglePayment) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Failed!, no id${paymentId} found in  payments Db` })
  }
  res.status(StatusCodes.OK).json({ payment: findSinglePayment })
}

const deletePayment = async (req, res) => {
  const { id: paymentId } = req.params

  const deletePayment = await PaymentSchema.findByIdAndDelete({
    _id: paymentId
  })
  if (!deletePayment) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Failed!, no id ${paymentId}` })
  }
  res
    .status(StatusCodes.OK)
    .json({ message: `Successfully deleted id ${paymentId}` })
}

//TODO: GET  PAYMENTS  BASED ON STATUS(confirmed,pending,failed,success)
const paymentStatus = async (req, res) => {

}
module.exports = {
  createPayment,
  getAllPayments,
  getSInglePayment,
  deletePayment,
  paymentStatus
}
