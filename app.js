const express = require('express')
require('dotenv').config()
// const {sendEmail} = require('./service/mailService')

const app = express()
const cookieParser = require('cookie-parser')

//for  file Upload

const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})
//Database connection

const dbConnection = require('./db/connectDb')

//authRouter

const authRouter = require('./routes/authRoute')
//otherRouter
const userRouter = require('./routes/userRoute')
const foodRouter = require('./routes/foodRoute')
const orderRouter = require('./routes/orderRoute')
//paymentRouter
const paymentRouter = require('./routes/paymentRoute')

const cors = require('cors')
//NOTE!
app.use(cors())
// from authRoute
app.use(express.json()) // This convert's  the request  to Jason from Postman

//ROUTES FOR  AUTH USERS
//cookieParser("secret") required for signed cookies'
app.use(cookieParser(process.env.JWT_SECRET))
//make  the public folder  available
//FILE  UPLOAD
app.use(express.static('./public'))
app.use(fileUpload({ useTempFiles: true }))
app.use('/api/v1/auth', authRouter)

//ROUTE FOR USERS
app.use('/api/v1/users', userRouter)
app.use('/api/v1/foods', foodRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/payment', paymentRouter)

//   Add Port
/* This code is setting up the server to listen on a specific port. */
const port = process.env.PORT || 3000 // if  the Port  is  undefined, use port 3000
const start = async () => {
  try {
    const db = await dbConnection(process.env.MONGO_URI)
    console.log('connection Successful')
  } catch (error) {
    console.log('connection Failed Error!', error)
  }
  app.listen(port, () => {
    console.log(`listening on  port ${port}`)
  })
}
start()
