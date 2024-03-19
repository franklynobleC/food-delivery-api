const express = require('express')
const router = express.Router()
const {
  createPayment,
  getSInglePayment,
  getAllPayments,
  deletePayment
} = require('../controllers/paymentController')
const { paymentWebHook } = require('../services/paymentService')
const {
  authorizedPermissions,
  authenticateUser
} = require('../middleware/authentication')

router.post(
  '/createPayment',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  createPayment
)

router.get(
  '/getAllPayments',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  getAllPayments
)
router.get(
  '/:id',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  getSInglePayment
)
router.delete(
  '/:id',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  deletePayment
)

module.exports = router
