const crypto = require('crypto')
//hashing  function  used  in  hashing  the  token before  saving  to  database
const hashString = string =>
  crypto.createHash('md5').update(string).digest('hex')

module.exports = hashString
