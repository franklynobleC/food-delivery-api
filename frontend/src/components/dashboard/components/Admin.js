import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'   style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'red'}}>
      Admin components Main
      <div>h1</div>
      <nav>
        <ul>
          <li>
            <Link to='dashboard/users'>users</Link>
          </li>
          <li>
            <Link to='dashboard/payments'>Payment</Link>
          </li>
          <p>Main Page</p>

        </ul>
      </nav>

    </div>
  )
}

export default Admin
