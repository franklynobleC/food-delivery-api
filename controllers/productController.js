const FoodSchema = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const path = require('path')

const getAllFood = async (req, res) => {
  req.body.user = req.user.userId

  const food = await FoodSchema.find({})
  if (!food) {
    res.status(StatusCodes.BAD_REQUEST).json({ food: 'Product not found' })
  }

  res.status(StatusCodes.OK).json({ allFood: food })
}

const getSingleFood = async (req, res) => {
  const { id: foodId } = req.params
  if (!foodId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ failed: 'Product not found, please provide a valid  id' })
  }

  const singleFood = await FoodSchema.findOne({ _id: foodId })

  res.status(StatusCodes.OK).json({ food: singleFood })
}
const createFood = async (req, res) => {
  const { name, description, price, category } = req.body

  if (!name || !description || !price || !category) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ failed: 'Please fill all fields' })
  }
  const createdFood = await FoodSchema.create({
    name,
    description,
    price,
    category
  })
  res.status(StatusCodes.CREATED).json({ food: createdFood })
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

  if (!updateFood) {
res.status(StatusCodes.BAD_REQUEST).json({ failed: 'Product not found in database, please provide a valid  id' })
  }
  res.status(StatusCodes.OK).json({ food: updateFood, message: "Success! food updated successfully" })
}
