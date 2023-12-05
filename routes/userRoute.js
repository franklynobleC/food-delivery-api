const express = require('express')

const router = express.Router()
const {
  authenticateUser,
  authorizeRoles
} = require('../middleware/authentication')
const authMiddleware = require('../middleware/authMid')

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
  authMiddleware,
  // authorizedPermissions('admin', 'user'),
  showCurrentUser
)

router.patch(
  '/updateUserPassword',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  updateUserPassword
)

//update user name and Email
router.patch(
  '/:id',
  authMiddleware,
  // authorizedPermissions('admin', 'user'),
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
    // authenticateUser,
    // authMiddleware,
    // authorizeRoles('admin', 'user'),
    getSingleUser
  )

//get single user
//router.get('/:id', getSingleUser)

//UPDATE  USER

//UPDATE  PASSwORD

module.exports = router
