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
        <h2> Sign in </h2>
        <div class='email'></div>
        <input
          type='email'
          required
          class='email-input-text'
          placeholder='enter email'
          autofocus
          value={email1}
          onChange={e => setUserEmail(e.target.value)}
        />
      </div>
      <div class='password-container'>
        <div class='password'></div>
        <input
          required
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
        <Link to={{ pathname:'/login', state: {from:location.pathname}}}>already have an account? Login</Link>
        <div></div>
        <Link to='reset'>forgot password? Reset password</Link>
      </div>
    </form>
  )
}

export default Auth
