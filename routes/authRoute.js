const express = require('express')
const router = express.Router()

//TODO
// Add  user, logOut,Login
const { register, login, logout } = require('../controllers/authController')
console.log('register route called')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router
