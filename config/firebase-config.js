const admin = require('firebase-admin')

let serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
