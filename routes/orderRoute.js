const express = require('express')
const router = express.Router()
const { authorizePermissions } = require('../middleware/auth')

const {
  authenticateUser,
  authorizedPermissions
} = require('../middleware/authentication')
const Middleware = require('../middleware/index')
const authMiddleware = require('../middleware/authMid')

const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  checkOut
  // getOrderStatus
} = require('../controllers/orderController')

//TODO:  ADD the Authentication and  authorization for routes

router.get('/checkout', checkOut)

router.get('/getAllOrders', getAllOrders)
router.get('/:id', getSingleOrder)
router.post(
  '/createOrder',
  // authMiddleware,
  Middleware.decode,
  Middleware.authorizePermissions('admin', 'user'),
  createOrder
)
router.patch('/:id', updateOrder)
router.delete('/:id', deleteOrder)
router.get(
  '/:orderstatus'
  // authenticateUser,
  // authorizedPermissions('admin', 'user')
  // getOrderStatus
)

module.exports = router
