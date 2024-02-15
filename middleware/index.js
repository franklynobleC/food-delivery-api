const admin = require('../config/firebase-config')

class Middleware {
  async decode (req, res, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]

    console.log('FROM FIRE  BASE AUTH  TEST  TOKEN  CHECK')
    try {
      const decodeValue = await admin.auth().verifyIdToken(token)
      // decodeValue.email_verified = true
      // console.log('UUID:', decodeValue.uid)
      console.log('Checking Mail Verification',         decodeValue)
      if (decodeValue.email_verified === false) {
        return res.json({ message: 'unauthorize, email not verified' })
      }
      if (
        decodeValue.email === 'essienfrankudom@gmail.com' &&
        decodeValue.email_verified === true
      ) {
        await admin.auth().setCustomUserClaims(decodeValue.sub, {
          role: 'admin'
        })
      }
      if (
        decodeValue.email_verified === true &&
        decodeValue.email !== 'essienfrankudom@gmail.com'
      ) {
        await admin.auth().setCustomUserClaims(decodeValue.sub, {
          role: 'user'
        })
      }
      ;(await admin.auth().getUser(decodeValue.uid)).customClaims
      console.log('Token Value from Server:', decodeValue, 'user is', req.user)
      console.log('Token Value from Server:', decodeValue, 'user is', req.user)
      // console.log('from  firebase Auth claims', checkClaims1)
      if (decodeValue) {
        req.user = {
          role: decodeValue.role,
          email: decodeValue.email
        }
        console.log('USER  IS', req.user)

        // console.log('from  firebase Auth claims', checkClaims1)

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
      console.log('Error Occurred In ', e)

      return res.json({ message: 'Internal server Error' })
    }
  }

  authorizePermissions = (...roles) => {
    return (req, res, next) => {
      console.log('Auth method works authorization Permission', req.user.role)
      if (roles.includes(req.user.role)) {
        req.user.role.admin === true || req.user.role.user === true

        next()
      } else {
        // )
        console.log('Unauthorize to access This Route!!')
        return 'Unauthorized to access this route'
      }

      console.log('Auth method works authorization Permission', req.user.role)

      // }
    }
  }
}

module.exports = new Middleware()
