const { sendMail } = require('../service/mailService')
const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/users/resetPassword?token=${token}&email=${email}`
  const message = `<p>Hello${name},please reset password by clicking  on  the following  link: <a href="${resetURL}">Reset Password</a></p>`
  const subject = `Password Reset`
  await sendMail(email, subject, message)
}
module.exports = sendResetPasswordEmail
