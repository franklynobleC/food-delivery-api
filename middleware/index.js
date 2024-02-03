const admin = require('../config/firebase-config')

class Middleware {
  async decode (req, res, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    console.log('FROM FIRE  BASE AUTH  TEST  TOKEN  CHECK')
    try {
      const decodeValue = await admin.auth().verifyIdToken(token)
      // decodeValue.email_verified = true
      let checkClaims1;
      console.log('UUID:', decodeValue.uid)
      if (decodeValue.email === 'essienfrankudom@gmail.com') {
        const decode2 = await admin
          .auth()
          .setCustomUserClaims(decodeValue.uid, {
            admin: true
          })
      }

      // console.log('checking what  Claims  is', claims)

      console.log('Token Value from Server:', decodeValue)

      const checkClaims = (await admin.auth().getUser()).customClaims
      console.log('check claims', checkClaims)
      if (decodeValue) {
        console.log('DECODE VALUE SEARCHING ROLES', decodeValue.roles)
        req.user = decodeValue

        console.log('USER  IS', req.user)

        console.log('from  firebase Auth')

        return next()
      }

      return res.json({ message: 'unauthorize' })
    } catch (e) {
      console.log('Error', e.message)
      if (!token) {
        console.log(
          'ERROR FROM  FIRE BASE CONFIG TOKEN  IS nULL  OR iNVALID',
          token
        )
        console.log(token)
        return res.json({ message: 'user Not Logged In' })
      }
      console.log('Error Occurred In ')

      return res.json({ message: 'Internal server Error' })
    }
  }
}

module.exports = new Middleware()
