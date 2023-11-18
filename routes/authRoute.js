const express = require('express')
const router = express.Router()

//TODO
// Add  user, logOut,Login
const {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword
} = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)

router.post('/resetPassword', resetPassword)
router.post('/forgotPassword', forgotPassword)
router.get('/logout', logout)

module.exports = router
