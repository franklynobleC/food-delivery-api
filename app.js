const express = require('express')
const bodyParser = require('body-parser')
// parse application/json
const {
  paymentWebHook,
  checkPaymentFromWebHook
} = require('./services/paymentService')

require('dotenv').config()
// const {sendEmail} = require('./service/mailService')

require('express-async-errors')

// Do something with the headers
const cookieParser = require('cookie-parser')
const app = express()

//for  file Upload
//TODO  IF        PAYMEMT  SUCCESSFUL,  SEND  MESSSAGE TO  THE CLIENT  THANK  YOU  MESSAGE AORDER  HAS  BEEN PLEASED

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
// app.use(cors())
// from authRoute

// This convert's  the request  to Jason from Postman

///ROUTES FOR  AUTH USERS
//cookieParser("secret") required for signed cookies'
// Curb Cores Error by adding a header here

//make  the public folder  available
//FILE  UPLOAD
app.use(bodyParser.json())

app.use(express.json())

app.use(cors())

app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))
app.use(fileUpload({ useTempFiles: true }))
app.use((req, res, next) => {
  // remove  some  of  these Headers,  redundant code
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use('/api/v1/auth', authRouter)

// app.post('https://food-delivery-api-wucx.onrender.com', paymentWebHook)
app.post('/webhook', checkPaymentFromWebHook)
app.get('/webhook', (req, res) => {
  res.send('Hello World!')
})
//ROUTE FOR USERS
app.use('/api/v1/users', userRouter)
app.use('/api/v1/foods', foodRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/payment', paymentRouter)

//   Add Port
/* This code is setting up the server to listen on a specific port. */
const port = process.env.PORT || 5000 // if  the Port  is  undefined, use port 3000

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
