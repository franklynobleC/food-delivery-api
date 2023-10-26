const express = require('express')
const router = express.Router()
const {
  createFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood,
  uploadImage,
  searchFood,
} = require('../controllers/foodController')

const {
  authorizedPermissions,
  authenticateUser
} = require('../middleware/authentication')
router.get(
  '/getAllFoods',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  getAllFoods
)
router.get(
  '/:searchWord',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  searchFood
)
router.get(
  '/:id',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  getSingleFood
)
router.patch(
  '/:id',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  updateFood
)

router.delete(
  '/:id',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  deleteFood
)

router.post(
  '/createFood',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  createFood
)

router.post(
  '/uploadImage',
  authenticateUser,
  authorizedPermissions('admin', 'user'),
  uploadImage
)

module.exports = router
