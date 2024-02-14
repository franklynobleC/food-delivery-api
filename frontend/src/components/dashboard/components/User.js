import React, { useEffect } from 'react'
import { useAdminContext } from '../../../context/admin_context'

const User = () => {
  const { users, fetchUsers } = useAdminContext()
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div className='payments-div'>
      {console.log(users)}

      <div>
        <h2>ALL USERS</h2>
      </div>
      <div className='payment-header-container'>
        <div className='main-header-content'>User Name</div>
        <div className='main-header-content'>User Email</div>
        <div className='main-header-content'>User Role</div>
      </div>
      {users.map((data, index) => (
        <div key={index} className='payment-content-container'>
          <div className='content'>{data.name}</div>
          <div className='content'>{data.email}</div>
          <div className='content'>{data.role}</div>
        </div>
      ))}
    </div>
  )
}

export default User
