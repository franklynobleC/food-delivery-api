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
  getAllUsers
} = require('../controllers/userController')

//TOD//update user password, (pass in  the new and  old  password)

router.patch(
  '/updateUserPassword',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  updateUserPassword
)

//update user name and Email
router.patch(
  '/:id',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  updateUser
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
