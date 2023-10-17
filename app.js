const express = require('express')
require('dotenv').config()
// const {sendEmail} = require('./service/mailService')

const app = express()

//Database connection

const dbConnection = require('./db/connectDb')

//authRouter

const authRouter = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoute')
const foodRouter = require('./routes/foodRoute')
const orderRouter = require('./routes/orderRoute')

//NOTE!

// from authRoute
app.use(express.json()) // This convert's  the request  to Jason from Postman

//ROUTES FOR  AUTH USERS
//cookieParser("secret") required for signed cookies'
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/api/v1/auth', authRouter)

//ROUTE FOR USERS
app.use('/api/v1/users', userRouter)
app.use('/api/v1/foods', foodRouter)
app.use('/api/v1/orders', orderRouter)

//   Add Port
/* This code is setting up the server to listen on a specific port. */
const port = process.env.PORT || 3000 // if  the Port  is  undefined, use port 3000
const start = async () => {
  try {
    const db = await dbConnection(process.env.MONGO_URI)
    console.log('connection Successful')
    //const  ml = sendEmail('testing for  mailGun!','Hello','essienfrankudom@gmail.com')
    //console.log(ml)
  } catch (error) {
    console.log('connection Failed Error!', error)
  }
  app.listen(port, () => {
    console.log(`listening on  port ${port}`)
  })
}
start()

const formData = require('form-data')
const Mailgun = require('mailgun.js')

console.log('Mail Gun  function')
const mailgun = new Mailgun(formData)
const client = mailgun.client({
  username: 'softwaretestX',
  key: process.env.EMAIL_API_KEY
})

const messageData = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'essienfrankudom@gmail.com',
  subject: 'hello',
  text: 'Mail Test MailGun!'
}

client.messages
  .create(process.env.EMAIL_DOMAIN_NAME, messageData)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
