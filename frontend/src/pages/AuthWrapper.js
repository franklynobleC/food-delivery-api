import React from 'react'
import { useAuthContext } from '../context/auth_context'
import { Route, useNavigate } from 'react-router-dom'
import ListView from '../components/ListView'

const AuthWrapper = ({ children }) => {
  const { error, loading, userId,user } = useAuthContext()
  console.log(userId,user)

  if (error) {
    return (
      <div>
        <h1>Error.....</h1>
      </div>
    )
  }
  return <>{children}</>
}

export default AuthWrapper
