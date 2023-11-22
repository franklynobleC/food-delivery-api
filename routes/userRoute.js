const express = require('express')

const router = express.Router()
const {
  authenticateUser,
  authorizedPermissions
} = require('../middleware/authentication')
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
  authenticateUser,
  authorizedPermissions('admin', 'user'),
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
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  updateUser
)
router.delete(
  '/:id',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  deleteUser
)

// GET ALL USERS
router.get(
  '/getAllUsers',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  getAllUsers
),
  router.get(
    '/:id',
    authenticateUser,
    authorizedPermissions('admin', 'user'),
    getSingleUser
  )

//get single user
//router.get('/:id', getSingleUser)

//UPDATE  USER

//UPDATE  PASSwORD

module.exports = router
