import React from 'react'
import { Route, useNavigate,redirectDocument } from 'react-router-dom'

import { useAuthContext } from '../context/auth_context'

const PrivateRoute = ({ children }) => {
  const { token } = useAuthContext()
  let navigate = useNavigate()
  console.log('FROM  PRIVATE ROUTE')
  if (!token) {
    return navigate('/login')
  }
  return children
}
export default PrivateRoute
