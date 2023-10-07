const OrderSchema = require('../models/Order')
const { StatusCodes } = require('http-status-codes')
const { restart } = require('nodemon')
const { json } = require('stream/consumers')

const createOrder = async (req, res) => {
  req.user = req.user.userId

  const createdOrder = await OrderSchema.create(req.body)

  if (!createdOrder || createdOrder.length === 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message:
        'Failed! could not create   order.  make sure input fields are valid',
      errors: createdOrder
    })
  }
  res.status(StatusCodes.CREATED).json({ order: createdOrder })
}

const getAllOrders = async (req, res) => {
  const allOrders = await OrderSchema.find({})

  if (!allOrders || allOrders.length === 0) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'No orders found Or  orders table empty'
    })
  }

  res.status(StatusCodes.OK).json({ orders: allOrders })
}

const getSingleOrder = async (req, res) => {
  const { id: singleOderId } = req.params
  const singleOrder = await OrderSchema.findOne({ _id: singleOderId })

  if (singleOrder === null || !singleOrder) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: `Failed! No user with id ${singleOderId} found in database`
    })
  }

  restart.status(StatusCodes.OK).json({ order: singleOrder })
}

//TODO  in this   function, ensure the UserId,  is  from  the request Object
const updateOrder = async (req, res) => {
  const updatedOrder = await OrderSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  if (!updatedOrder || updatedOrder === null) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Failed! could not update order data. please input valid data'
    })
  }

  res.status(StatusCodes.OK).json({ orderUpdated: updatedOrder })
}
const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params
  const deletedOrder = await OrderSchema.findByIdAndDelete({ _id: orderId })
  if (!deletedOrder || deletedOrder === null) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Error! could  not find data with id, ${orderId}` })
  }

  res
    .status(StatusCodes.OK)
    .json({ message: `Success!  order with id ${orderId},deleted.` })
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder
}
