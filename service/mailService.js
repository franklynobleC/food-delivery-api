// const formData  = require ('form-data');
// const Mailgun = require ('mailgun.js');

// const sendEmail = async (mailText, subject, toReceiver) => {
//   console.log('Mail Gun  function')
//   const mailgun = new Mailgun(formData)
//   const client = mailgun.client({
//     userName: 'softwareX',
//     key: process.env.EMAIL_API_KEY
//   })

//   const messageData = {
//     from: process.env.EMAIL_DOMAIN_NAME,
//     to: toReceiver,
//     subject: subject,
//     text: mailText
//   }

//   client.messages
//     .create(process.env.EMAIL_DOMAIN_NAME, messageData)
//     .then(res => {
//       console.log(res)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

// exports.module = sendEmail
