const OrderSchema = require('../models/Order')
const FoodSchema = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const { restart } = require('nodemon')
const { json } = require('stream/consumers')
const { error } = require('console')
const { STATUS_CODES } = require('http')

//   TODO:       add check Permission,  to rout  authUser and check Permission
const createOrder = async (req, res) => {
  // req.user = req.user.userId
  console.log(req.user.userId)
  const { OrderItems: OrderItems, deliveryFee } = req.body

  console.log(OrderItems, deliveryFee)

  if (!OrderItems) {
    throw new Error({ message: 'OrderItems is required' })
  }
  if (!deliveryFee || deliveryFee === null) {
    throw new Error({
      message: 'totalQuantity, totalPrice, deliveryFee is required'
    })
  }
  let orderItems = []
  let subTotal = 0
  let totalPriceValue = 0
  let itemTotalQuantity = 0
  for (let i = 0; i < OrderItems.length; i++) {
    console.log(OrderItems[i].food)
    const foodFromDb = await FoodSchema.findOne({ _id: OrderItems[i].food })

    if (!foodFromDb || foodFromDb === null) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `food not found${error.message}` })
    }

    //Destructure and  pass  Data from foodDb
    const { _id, name, image, price } = foodFromDb
    const singleOrderItem = {
      food: _id,
      name,
      image,
      price,
      quantity: OrderItems[i].quantity
    }

    itemTotalQuantity += OrderItems[i].quantity
    //orderItems.push[singleOrderItem]

    //orderItems += OrderItems[i]

    orderItems = [...orderItems, singleOrderItem]

    //calculateSubTotal
    subTotal += singleOrderItem.price * singleOrderItem.quantity
  }
  //calculate touch-action-delay
  totalPriceValue = subTotal + deliveryFee

  const createdOrderItem = await OrderSchema.create({
    OrderItems: orderItems,
    totalQuantity: itemTotalQuantity,
    totalPrice: totalPriceValue,
    deliveryFee,
    user: req.user.userId
  })

  res.status(StatusCodes.CREATED).json({
    order: createdOrderItem,
    message: 'Success! Order created successfully'
  })
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
