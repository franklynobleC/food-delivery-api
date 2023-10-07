const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizedPermissions
} = require('../middleware/authentication')

const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSingleOrder
} = require('../controllers/orderController')

router.post(
  '/createOrder',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  createOrder
)
router.get('/getAllOrders', getAllOrders)
router.get('/:id', getSingleOrder)
router.patch('/:id', updateOrder)
router.delete('/:id', deleteOrder)

module.exports = router
