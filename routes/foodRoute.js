const express = require('express')
const router = express.Router()
const {
  createFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood,
  uploadImage,
  searchFood
} = require('../controllers/foodController')
//TODO :  THE      GET ALL  PRODUCTS ROUTE, ADD  USER  PERMISSION AND AUTHORIZATION, AUTHENTICATE  USER
const { authenticateUser } = require('../middleware/authentication')
const { authorizePermissions } = require('../middleware/auth')
const authMiddleware = require('../middleware/authMid')
router.get(
  '/getAllFoods',
  //  authMiddleware,

  getAllFoods
)

router.get(
  '/getSingleFood/:id',
  // authenticateUser,
  // authorizePermissions('admin', 'user'),
  getSingleFood
)
router.get(
  '/searchWord/:searchWord',
  authenticateUser,
  // authorizedPermissions('admin', 'user'),
  searchFood
)

router.patch(
  '/:id',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  updateFood
)

router.delete(
  '/:id',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  deleteFood
)

router.post(
  '/createFood',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  createFood
)

router.post(
  '/uploadImage',
  // authenticateUser,
  // authorizedPermissions('admin', 'user'),
  uploadImage
)

module.exports = router
