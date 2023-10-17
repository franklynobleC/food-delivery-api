const FoodSchema = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
//TODO:
//add Search index to check  if food entered is protein, breakfast, and  dinner
const getAllFoods = async (req, res) => {
  const food = await FoodSchema.find({})
  if (!food) {
    res.status(StatusCodes.BAD_REQUEST).json({ food: 'No product found in database' })
  }

  res.status(StatusCodes.OK).json({ allFood: food })
}

const getSingleFood = async (req, res) => {
  const { id: foodId } = req.params
  console.log(foodId, 'params  id and  added')
  if (!foodId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ failed: 'failed. please provide a valid  id' })
  }

  const singleFood = await FoodSchema.findOne({ _id: foodId })

  if (!singleFood || singleFood === null || singleFood.length === 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      failed: `food with id ${foodId} not found in database, please provide a valid id`
    })

    return
  }
  res.status(StatusCodes.OK).json({ food: singleFood })
}

const createFood = async (req, res) => {
  req.body.user = req.user.userId

  console.log(req.user, '/n from create food route')

  if (!req.body) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ failed: 'Please fill all fields' })
  }
  const createdFood = await FoodSchema.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ createdFood })
}

const updateFood = async (req, res) => {
  // this value would OnlyUpdate for  name,  category, description, price
  // image update would have  anotherUpdate
  const { id: foodId } = req.params

  const updateFood = await FoodSchema.findOneAndUpdate(
    { _id: foodId },
    req.body,
    {
      runValidators: true,
      new: true
    }
  )

  if (!foodId || updateFood.length === 0 || updateFood === null) {
    res.status(StatusCodes.BAD_REQUEST).json({
      failed: 'Product not found in database, please provide a valid  id'
    })
  }
  res
    .status(StatusCodes.OK)
    .json({ food: updateFood, message: 'Success! food updated successfully' })
}

const deleteFood = async (req, res) => {
  const { id: foodId } = req.params
  const singleFoodToDelete = await FoodSchema.findOneAndDelete({ _id: foodId })
  if (
    !singleFoodToDelete ||
    singleFoodToDelete === null ||
    singleFoodToDelete.length === 0
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ failed: `failed, could not find  food with  id ${foodId}` })
  }
  res
    .status(StatusCodes.OK)
    .json({ message: `Success! food with id ${foodId} deleted successfully` })
}
//TODO:
//add search Index for category
const getFoodCategory = async (req, res) => {

  //const  category =

}

module.exports = {
  getAllFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood
}
