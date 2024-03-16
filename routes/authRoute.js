const express = require('express')
const router = express.Router()

//TODO

const {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword
} = require('../controllers/authController')

router.post('/resetPassword', resetPassword)

router.post('/forgotPassword', forgotPassword)
router.post('/login', login)
router.post('/register', register)

router.get('/logout', logout)

module.exports = router
