const express = require('express')
const router = express.Router()
const {createPayment} = require('../controllers/paymentController')
const {
  authorizedPermissions,
  authenticateUser
} = require('../middleware/authentication')

router.post(
  '/createPayment',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  createPayment
)

module.exports = router
