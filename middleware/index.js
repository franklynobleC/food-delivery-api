const admin = require('../config/firebase-config')

class Middleware {
  async decode (req, resp, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]

    // const v1 = await admin.verifyIdToken(token)

    // console.log(v1)
    // console.log('Token Data from Server  is ', token)

    try {
      const decodeValue = await admin.auth().verifyIdToken(token)
      console.log('Token Value from Server:', decodeValue)
      if (decodeValue) {
        req.user = decodeValue

        return next()
      }

      return resp.json({ message: 'unauthorize' })
    } catch (e) {
      console.log('Error', e.message)
      if (!token) {
        console.log(token)
        return resp.json({ message: 'user Not Logged In' })
      }

      return resp.json({ message: 'Internal server Error' })
    }
  }
}

module.exports = new Middleware()
