const admin = require('../config/firebase-config')

class Middleware {
  async decode (req, res, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]

    console.log('FROM FIRE  BASE AUTH  TEST  TOKEN  CHECK')
    try {
      let decodeValue = await admin.auth().verifyIdToken(token)

      console.log('Checking Mail Verification', decodeValue)
      if (decodeValue.email_verified === false) {
        return res.json({ message: 'unauthorize, email not verified' })
      }

      if (decodeValue.email_verified === true) {
        if (
          decodeValue.email === 'franklynoblez@gmail.com' ||
          decodeValue.email === 'essienfrankudom@gmail.com'
        ) {
          await admin.auth().setCustomUserClaims(decodeValue.sub, {
            role: 'admin'
          })
        } else {
          await admin.auth().setCustomUserClaims(decodeValue.sub, {
            role: 'user'
          })
        }
        if (decodeValue) {
          req.user = {
            role: decodeValue.role,
            email: decodeValue.email
          }
          console.log('USER  IS', req.user)

          return next()
        }
      } else {
        return res.json({ message: 'unauthorized, email not verified' })
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
      if (roles.includes(req.user.role) || roles.includes(req.user.email)) {
        if (
          req.user.role.admin === true ||
          req.user.role.user === true ||
          req.user.email
        ) {
          next()
        }
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
