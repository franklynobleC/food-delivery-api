import React, { useEffect, useState } from 'react'
import toast, { toastConfig } from 'react-simple-toasts'
// import toast, { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/success.css'
// import 'react-simple-toasts/dist/theme/info.css'
import { Link, useNavigate } from 'react-router-dom'

// toastConfig({ theme: 'success', position: 'top-right' })
import { toastConfigAlert, ShowToast } from '../toastConfigAlert'

import { useAuthContext } from '../context/auth_context'
import 'react-simple-toasts/dist/theme/info.css'
// toastConfig({ theme: 'info', position: 'center' })

const PasswordReset = () => {
  let navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [isMailSent, setIsMailSent] = useState(false)
  const { registerUser, resetPassword } = useAuthContext()
  const handleSubmit = e => {
    e.preventDefault()
    console.log('user Email Is', userEmail)
    resetPassword(userEmail)
toastConfigAlert.theme = 'info'
toastConfigAlert.position = 'center'

    setTimeout(() => {

      navigate('/login')
    }, 2000)
    ShowToast('Email Sent,  Please Check Your  MailBox To Reset Your Password')
    setIsMailSent(true)

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
            Send password reset email
          </button>
        </div>
      </form>
    </div>
  )
}

export default PasswordReset
