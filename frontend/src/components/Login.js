import React, { useState } from 'react'
import { useUserContext } from '../context/user_context'
import { Foods } from '../pages'
import { Link, Redirect, useNavigate } from 'react-router-dom'
const Login = () => {
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const { loginUser, is_registered, is_logged_in, userId } = useUserContext()
  let navigate = useNavigate()
  const handleSubmit = e => {
    e.preventDefault()
    console.log(userPassword, userEmail)
    loginUser(userEmail, userPassword)
  }
  console.log(is_logged_in)
  console.log('from user loggedIn Data WITH USER ID',userId)

  if (is_logged_in) {
    return navigate('/foods')
  }

  return (
    <form class='login-container' onSubmit={handleSubmit}>
      <div class='email-container'>
        <h3>LOGIN</h3>
        <div class='email'>email</div>
        <input
          type='email'
          class='email-input-text'
          placeholder='enter email'
          autofocus
          value={userEmail}
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
          value={userPassword}
          onChange={e => setUserPassword(e.target.value)}
        />
      </div>
      <div class='signup-container'>
        <button class='sign-up'>Login</button>
      </div>
      <div class='password-reset-login'>
        <a href='/'>Home page</a>
        <div></div>
        <a href='./index.html'> forgot password? Reset password</a>
      </div>
    </form>
  )
}

export default Login
