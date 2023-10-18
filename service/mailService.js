const formData = require('form-data')
const Mailgun = require('mailgun.js')

const sendMail = async (email, name) => {
  console.log('Mail Gun  function')
  const mailgun = new Mailgun(formData)
  const client = mailgun.client({
    username: 'softwaretestX',
    key: process.env.EMAIL_API_KEY
  })

  const messageData = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: email,
    subject: 'hello',
    text: 'Mail Test MailGun!',
    html: `<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome Message</title>
</head>
<body>
<h3>Dear, ${name},</h3>
<p>Welcome to ContinentalDish. </p>
<p>We have all Kinds of assorted food,  please visit our site to  place  your Order and for  more information,  please  visit www...... </p>
</body>
</html>`
  }

  await client.messages
    .create(process.env.EMAIL_DOMAIN_NAME, messageData)
    .then(res => {
      //console.log(res)
      return  JSON.stringify(res)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = sendMail
