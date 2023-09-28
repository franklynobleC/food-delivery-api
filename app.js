const express = require('express')
require('dotenv').config()

//app
const app = express()

//Database connection

const dbConnection = require('./db/connectDb')

//authRouter

const authRouter = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoute')

//NOTE!

// from authRoute
app.use(express.json()) // This convert's  the request  to Jason from Postman

//ROUTES FOR  AUTH USERS
//cookieParser("secret") required for signed cookies'
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/api/v1/auth', authRouter)

//ROUTE FOR USERS
app.use('/api/v1/users', userRouter)

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
