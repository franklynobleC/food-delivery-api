const FoodSchema = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const fs = require('fs')
const { checkPermissions } = require('../utils')
const cloudinary = require('cloudinary').v2
//TODO:
//add Search index to check  if food entered is protein, breakfast, and  dinner
const getAllFoods = async (req, res) => {
  console.log('All Foods API>>>>>>>')
  const food = await FoodSchema.find({})
  if (!food) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ food: 'No b  product found in database' })
  }
  // checkPermissions(req.user, food.user)

  res.status(StatusCodes.OK).json(food)
}

const getSingleFood = async (req, res) => {
  console.log('Single Food ')
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
  res.status(StatusCodes.OK).json(singleFood)
}

const createFood = async (req, res) => {
  //TODO: uncomment this  getting user id from req.user
  // req.body.user = req.user.userId

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

  // console.log(req.params, 'params')
  const { id } = req.params
  console.log('ID las Updated IS', id, 'FoodId is')

  console.log('update Id  is', id)

  const updateFood = await FoodSchema.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true
  })

  if (!id || updateFood.length === 0 || updateFood === null) {
    res.status(StatusCodes.BAD_REQUEST).json({
      failed: 'Product not found in database, please provide a valid  id'
    })
  }
  res
    .status(StatusCodes.OK)
    .json({ food: updateFood, message: 'Success! food updated successfully' })
}

const deleteFood = async (req, res) => {
  console.log('Delet func')
  const { id: foodId } = req.params
  // if (foodId) {
  //   console.log('food  id', foodId)
  //   return
  // } else {
  //   console.log('Food ID  in else', foodId)
  //   return
  // }

  console.log(foodId, 'params  id and  added')
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
  const maxSize = 1024 * 1024 * 5

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

//TODO: change  the file size to 2mb or 1mb instead
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
  const maxSize = 1024 * 1024 * 6

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
  //take a query from   req, use  the word to search  if  it  matches  any name  in  the,
 //  food name value,  if  match  is found,  return match, else return error
  await FoodSchema.createIndexes({ name: 'text' })

  const searchWord = req.query.searchWord

  console.log(searchWord)
  //const convword = String(searchWord)

  // try {
  //   const agg = [
  //     {
  //       $search: {
  //         index: {
  //           name: searchWord
  //         },
  //         query: {
  //           name: {
  //             $regex: searchWord,
  //             $options: 'i'
  //           }
  //         }
  //       }
  //     },

  //     { $limit: 2 },

  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         description: 1,
  //         category: 1
  //       }
  //     }
  //   ]
  try {
    const result = await FoodSchema.find({ $text: { $search: searchWord } })
    //console.log(result)
    result.forEach(doc => console.log(JSON.stringify(doc)))

    console.log('RESULT >>>>>>>>>>>>>>>>>>>>>')
    if (result.length === 0) {
      return res.status(StatusCodes.OK).json({ message: 'No match found' })
    }
    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Failed!${error}` })
  }
}

const getFoodImages = async (req, res) => {
  try {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'file-upload'
    })
    const imageURL = await resources.map(resource => {
      // console.log('image  url  is', resource.secure_url)
      return resource.secure_url
    })
    // console.log(imageURL)
    res.status(StatusCodes.OK).json(imageURL)
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: `Failed!${error}` })
  }
}

module.exports = {
  getAllFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood,
  uploadImage,
  searchFood,
  getFoodImages
}
