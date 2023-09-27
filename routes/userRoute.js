const express = require('express')

const router = express.Router()
const {
  authenticateUser,
  authorizedPermissions
} = require('../middleware/authentication')
//import  all  from  the controller

const {
  updateSingleUser,
  getSingleUser,
  getAllUsers
} = require('../controllers/userController')

//TODO

// GET ALL USERS
router.get(
  '/getAllUsers',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  getAllUsers,
),

router.get('/:id', authenticateUser,
  authorizedPermissions('admin', 'user'), getSingleUser)

//get single user
//router.get('/:id', getSingleUser)

//UPDATE  USER

//UPDATE  PASSwORD

module.exports = router
