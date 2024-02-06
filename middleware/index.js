const admin = require('../config/firebase-config')

class Middleware {
  async decode (req, res, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    let checkClaims1
    console.log('FROM FIRE  BASE AUTH  TEST  TOKEN  CHECK')
    try {
      const decodeValue = await admin.auth().verifyIdToken(token)
      // decodeValue.email_verified = true
      console.log('UUID:', decodeValue.uid)
      if (decodeValue.email === 'essienfrankudom@gmail.com') {
        checkClaims1 = await admin.auth().setCustomUserClaims(decodeValue.sub, {
          role: {
            admin: 'admin'
            // user: 'user'
          }
        })
      } else {
        checkClaims1 = admin.auth().setCustomUserClaims(decodeValue.sub, {
          role: {
            user: 'user'
          }
        })
      }

      // console.log('checking what  Claims  is', claims)

      console.log('Token Value from Server:', decodeValue, 'user is', req.user)
      // (await admin.auth().getUser()).customClaims
      // console.log('check claims', checkClaims)
      if (decodeValue) {
        console.log('DECODE VALUE SEARCHING ROLES', decodeValue.role)
        req.user = {
          role: decodeValue.role,
          email: decodeValue.email
        }
        // req.user = decodeValue.role,

        // console.log(checkClaims1)
        // req.user = checkClaims1

        console.log('USER  IS', req.user.role)

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
      if (!roles.includes(req.user.role.admin || req.user.role.user)) {
        // throw new CustomError.UnauthorizedError(
        //   'Unauthorized to access this route'
        console.log(req.user.role)
        // )
        console.log('Unauthorize to access This Route!!')
        return 'Unauthorized to access this route'
      }
      console.log('Auth method works authorization Permission', req.user.role)
      next()
      // }
    }
  }
}

module.exports = new Middleware()
