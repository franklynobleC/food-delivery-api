const express = require('express')
const router = express.Router()

//TODO
// Add  user, logOut,Login
const { register } = require('../controllers/authController')
console.log('register route called')

router.post('/register', register)

module.exports = router;
