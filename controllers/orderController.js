const OrderSchema = require('../models/Order')
const FoodSchema = require('../models/Food')
const UserSchema = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { restart } = require('nodemon')
const { json } = require('stream/consumers')
const { error } = require('console')
const { STATUS_CODES } = require('http')
const { makePayment } = require('../services/paymentService')

const { search } = require('../db/searchData')

//   TODO:       add check Permission,  to rout  authUser and check Permission
const createOrder = async (req, res) => {
  // req.user = req.user.userId
  // console.log(user.userId)
  //console.log(req.user.userId)
  const { OrderItems: OrderItems, paymentoption, deliveryFee } = req.body

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
    console.log(foodFromDb, 'From Food DB')
    if (!foodFromDb || foodFromDb === null) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `food not found${error.message}` })
    }

    //Destructure and  pass  Data from foodDb
    const { _id, name, image, price } = foodFromDb
    const singleOrderItem = {
      food: _id,
      name: name,
      image: image,
      price: price,
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
  //TODO:
  //add payment and  amount,
  //send Email for Order placement. this email should contain, food name, quantity,and price of  the  total  Food
  //NOTE: total price  is  including  Delivery Fee
  const userProperty = await UserSchema.findOne({ _id: req.user.userId })
  console.log(userProperty, 'From User DB')
  //TODO: add  payment  based on PaymentOption (if  payment  option is selected cash|| card)
  const createdOrderItem = await OrderSchema.create({
    OrderItems: orderItems,
    totalQuantity: itemTotalQuantity,
    totalPrice: totalPriceValue,
    paymentOption: paymentoption,
    deliveryFee,
    user: userProperty
  })
  const orderItemId = await OrderSchema.findOne({ _id: createdOrderItem._id })
  console.log(orderItemId, 'From Order DB')

  const { paymentOption } = createdOrderItem
  console.log(paymentOption)

  //const checkPaymentOption = await OrderSchema.find({ paymentOption })
  //console.log(checkPaymentOption, 'From Order DB')
  //const { paymentOption} =  checkPaymentOption
  console.log(paymentOption, 'From Order DB')
  if (paymentOption === 'cash') {
    console.log('Cash Payment Option Selected')
    const paymentData = await makePayment(
      userProperty.email,
      totalPriceValue,
      //orderItems,
      orderItemId._id,
      paymentOption
    )
    console.log(paymentData, 'From Payment DB')
    //TODO: send email to user
  }
  //Todo: code clean  up to  handle  order  and and  payment and  send  emails

  const paymentData = await makePayment(
    userProperty.email,
    totalPriceValue,
    orderItemId._id,
    paymentOption
  )
  //Todo: if  payment  is successful,  send  email to  the User
  console.log(paymentData, 'From Payment DB')
  res.status(StatusCodes.CREATED).json(createdOrderItem)
}
const getAllPendingOrders = async (req, res) => {
  const pendingOrders = await OrderSchema.find({ status: 'Pending' })
  if (!pendingOrders || pendingOrders.length === 0) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: `No orders found Or  orders table empty ${Error.message}`
    })
  }

  res.status(StatusCodes.OK).json({ orders: pendingOrders })
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

  res.status(StatusCodes.OK).json({ order: singleOrder })
}

//TODO  in this   function, ensure the UserId,  is  from  the request Object
//add function,  if  cart  is Empty, Delete from Database
const updateOrder = async (req, res) => {
  const updatedOrder = await OrderSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true, validateBeforeSave: true, error: true }
  )
  console.log(updatedOrder)
  console.log(updatedOrder.orderStatus)
  if (!updatedOrder || updatedOrder === null) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Failed! could not update order data. please input valid data'
    })
  }

  res.status(StatusCodes.OK).json({ orderUpdated: updatedOrder })
}
//TODO:
/**============================================
 *   add Method  to  show status, either pending,payed,failed  or cancelled
 *=============================================**/
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

//TODO: get Orders  based  on  the  status(failed, pending, confirmed, delivered, canceled)
const updateOrderStatus = async (req, res) => {
  const { id: orderId } = req.params

  //const  searchResult =   updateOrderStatus(searchWord,searchWord)
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getAllPendingOrders,
  updateOrderStatus
}
