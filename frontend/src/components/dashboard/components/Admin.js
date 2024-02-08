import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      Admin
      <div>h1</div>
      <div>h1</div>
      <div>h1</div>
        ;<nav>
  <ul>
    <li>
      <Link to='/dashboard/users'>users</Link>
    </li>
    <li>
      <Link to='/dashboard/payments'>Payment</Link>
    </li>
    <li>

    </li>
  </ul>
</nav>
;<nav>
  <ul>
    <li>
      <Link to='/dashboard/users'>users</Link>
    </li>
    <li>
      <Link to='dashboard/payments'>Payment</Link>
    </li>
    <li>
      <Link to='dashboard/orders'>orders</Link>
    </li>
    <li>
      <Link to='/dashboard/paymentslist'>paymentList</Link>
      <Link to='/dashboard/pay'>pay</Link>
    </li>
  </ul>
</nav>

    </div>
  )
}

export default Admin
