const express = require('express')

const router = express.Router()
const {
  authenticateUser,
  authorizeRoles
} = require('../middleware/authentication')
const authMiddleware = require('../middleware/authMid')
const Middleware = require('../middleware/index')

//import  all  from  the controller

const {
  updateUserPassword,
  updateUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  showCurrentUser
} = require('../controllers/userController')

//TOD//update user password, (pass in  the new and  old  password)
router.get(
  '/showCurrentUser',

  showCurrentUser
)

router.patch(
  '/updateUserPassword',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  updateUserPassword
)

//NOTE: update user name and Email, deliveryAddress
router.patch(
  '/:id',

  Middleware.decode,

  updateUser
)
router.delete(
  '/:id',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  deleteUser
)

// GET ALL USERS
router.get(
  '/getAllUsers',

  // authMiddleware,
  // authorizeRoles('admin', 'user'),
  getAllUsers
),
  router.get(
    '/:id',

    getSingleUser
  )

//get single user
//router.get('/:id', getSingleUser)

//UPDATE  USER

//UPDATE  PASSwORD

module.exports = router
