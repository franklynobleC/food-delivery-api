const mongoose = require('mongoose')

//Mongo Connection   parsing  URL
const connectDb = url => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    //userCreateIndex: true,
    //userFindAndModify:false,
    useUnifiedTopology: true
  })
}

module.exports = connectDb
