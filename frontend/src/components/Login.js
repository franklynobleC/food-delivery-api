import React, { useState } from 'react'
import { useUserContext } from '../context/user_context'

const Login = () => {
  const  [name, setName] = useState('')
  const  [email, setEmail] = useState('')
  const {loginUser,is_registered } = useUserContext()
  return <div>Login</div>
}

export default Login
