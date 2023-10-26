const PaymentSchema = require('../models/Payment')
const OrderSchema = require('../models/Order')
const search = async searchWords => {
  try {
    if (searchWords.length > 0) {
      if (searchWords === 'pending') {
        return searchWords
      }
      if (searchWords === 'success') {
        return searchWords
      }
      if (searchWords === 'canceled') {
        return searchWords
      }
      if (searchWords === 'delivered') {
        return searchWords
      }
      if (searchWords === 'success') {
        return searchWords
      }
      if (searchWords === 'failed') {
        return searchWords
      }
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  search
}
