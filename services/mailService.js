const formData = require('form-data')
const Mailgun = require('mailgun.js')
/**
 * The above function is a JavaScript function that sends an email to a specified email address with a
 * specified name.
 * @param email - The `email` parameter is a string that represents the email address of the recipient.
 * @param name - The `name` parameter is a string that represents the name of the recipient of the
 * email.
 */

//TODO:
//change email, using sendGrid instead of      MailGun
const sendMail = async (email,name,subject,message) => {
  console.log('Mail Gun  function')
  const mailgun = new Mailgun(formData)
  const client = mailgun.client({
    username: 'softwaretestX',
    key: process.env.EMAIL_API_KEY
  })

  const messageData = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: email,
    subject: subject,
    text: message,
    html:`<h4>Hello, ${name}</h4>${message}${subject
}`

  }

  await client.messages
    .create(process.env.EMAIL_DOMAIN_NAME, messageData)
    .then(res => {
      //console.log(res)
      return JSON.stringify(res)
    })
    .catch(err => {
      console.log(err)
    })
}
const emailFunc = async (email, name) => {
  const response = await sendMail(email, name)
  return JSON.stringify(response)
}

module.exports = {
  sendMail,
  emailFunc
}
