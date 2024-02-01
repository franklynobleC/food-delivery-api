import React, { useEffect, useState } from 'react'
import toast, { toastConfig } from 'react-simple-toasts'

import { useAuthContext } from '../context/auth_context'
import 'react-simple-toasts/dist/theme/info.css'
// toastConfig({ theme: 'info', position: 'center' })

const PasswordReset = () => {
  const [userEmail, setUserEmail] = useState('')
  const { registerUser, resetPassword } = useAuthContext()
  const handleSubmit = e => {
    e.preventDefault()
    console.log('user Email Is', userEmail)
    resetPassword(userEmail)
    setTimeout(() => {
      // toast(
      //   'A mail  has  been sent,  please  check  your  mail box for  password Reset  '
      // )
    }, 1000)
    //TODO: navigate user to The Login Page
  }
  return (
    <div>
      <form onSubmit={handleSubmit} class='login-container'>
        <div class='email-container'>
          <input
            class='email-input-text'
            type='email'
            value={userEmail}
            placeholder='enter email '
            name='email'
            onChange={e => setUserEmail(e.target.value)}
          />
        </div>
        <div class='signup-container'>
          <button class='sign-up' type='submit'>
            send Password Reset Email
          </button>
        </div>
      </form>
    </div>
  )
}

export default PasswordReset
