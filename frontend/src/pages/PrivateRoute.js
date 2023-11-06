import React from 'react'
import { Route, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../context/auth_context'

const PrivateRoute = ({ children }) => {
  const { is_logged_in } = useAuthContext()
  let navigate = useNavigate()
  console.log('FROM  PRIVATE ROUTE')
  if (!is_logged_in) {
    navigate('/')
  }
  return <>children</>
}
export default PrivateRoute
