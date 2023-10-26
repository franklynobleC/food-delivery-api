const FoodSchema = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
//TODO:
//add Search index to check  if food entered is protein, breakfast, and  dinner
const getAllFoods = async (req, res) => {
  const food = await FoodSchema.find({})
  if (!food) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ food: 'No product found in database' })
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
  console.log(req.body)

  if (!req.body) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ failed: 'Please fill all fields' })
  }
  //const {name,price,description,image,category,delivery,user} = req.body
  const createdFood = await FoodSchema.create(req.body)
  console.log(createdFood)
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

const uploadImageLocal = async (req, res) => {
  console.log('uploadImage func called')
  if (!req.files) {
    throw new Error(`No  File Uploaded${error.name}`)
  }
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new error('please upload Image')
  }
  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    throw new error('please upload Image smaller than 1MB')
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )
  await productImage.mv(imagePath)
  res.status(StatusCodes.OK).json({
    image: `/uploads/${productImage.name}`,
    message: 'Image uploaded successfully'
  })
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Failed! no file uploaded,  please  upload  file' })
    return
  }
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Failed! please upload filetype image' })
    return
  }
  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Failed! please upload Image smaller than 1MB' })
  }

  const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
    use_filename: true,
    folder: 'file-upload'
  })
  /* `fs.unlinkSync(req.files.image.tempFilePath)` is a function call to the `unlinkSync` method from
  the `fs` module in Node.js.  this */
  fs.unlinkSync(productImage.tempFilePath)

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

const searchFood = async (req, res) => {
  //take a query from   req, use  the word to search  if  it  matches  any name  in  the,  food name value,  if  match  is found,  return  match, else return  error
  const searchWord = req.query.searchWord
  //req.params.searchWord
  console.log(searchWord)
try {
  const agg = [
    {
      $search: {
        autocomplete: { query: searchWord, path: 'name' }
      }
    },

    { $limit: 2 },

    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        category: 1
      }
    }
  ]

  const result = await FoodSchema.aggregate(agg)
  //console.log(result)
    result.forEach(doc => console.log(JSON.stringify(doc)))

    console.log(result)
    console.log('RESULT >>>>>>>>>>>>>>>>>>>>>')

  } catch (err) {
    console.log('ERROR>>>>>>>')
    console.log(err)
  }
}

module.exports = {
  getAllFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood,
  uploadImage,
  searchFood
}
