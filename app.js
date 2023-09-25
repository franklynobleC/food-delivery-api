const express = require('express')
require('dotenv').config()

//app
const app = express()

//Database connection

const dbConnection = require('./db/connectDb')

//authRouter

const authRouter = require('./routes/authRoute')

//NOTE!
app.use(express.json()) // This convert's  the request  to Jason from Postman
// from authRoute
app.use('/api/v1/auth', authRouter)

//   Add Port
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
