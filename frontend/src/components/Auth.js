import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/auth_context'
import '../styles/user/register.css'
function Auth () {
  const { registerUser, state, email, password } = useAuthContext()

  const [email1, setUserEmail] = useState('')
  const [password1, setUserPassword] = useState('')
  const handleSubmit = e => {
    e.preventDefault()

    console.log('FROM FORM  SUBMIT>>>>.')

    console.log(email1, password1)

    registerUser(email1, password1)
    setUserEmail('')
    setUserPassword('')
  }

  return (
    <form class='login-container' onSubmit={handleSubmit}>
      <div class='email-container'>
        <div class='email'>email</div>
        <input
          type='email'
          class='email-input-text'
          placeholder='enter email'
          autofocus
          value={email1}
          onChange={e => setUserEmail(e.target.value)}
        />
      </div>
      <div class='password-container'>
        <div class='password'>password</div>
        <input
          type='text'
          class='password-input-text'
          placeholder='enter password'
          autofocus
          value={password1}
          onChange={e => setUserPassword(e.target.value)}
        />
      </div>
      <div class='signup-container'>
        <button class='sign-up'>Sign Up</button>
      </div>
      <div class='password-reset-login'>
        <Link to='/login'>already have an account? Login</Link>
        <div></div>
        <Link to='reset'>forgot password? Reset password</Link>
      </div>
    </form>
  )
}

export default Auth