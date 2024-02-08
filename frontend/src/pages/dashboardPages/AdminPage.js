import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  Admin,
  User,
  UserList,
  PaymentList
} from '../../components/dashboard/components/index'
import { Orders, Payments, Users } from '../../pages/dashboardPages'
import PaymentsPage from '../dashboardPages/PaymentsPage'
const AdminPage = () => {
  return (
    <div>
      {/* Add any common layout or navigation for the admin section */}
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to='/dashboard/users'>users</Link>
          </li>
          <li>
            <Link to='/payments'>Payment</Link>
          </li>
          <li>
            <Link to='/dashboard/orders'>orders</Link>
          </li>
          <li>
            <Link to='/dashboard/paymentslist'>paymentList</Link>
            <Link to='/dashboard/pay'>pay</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Admin />} />
        <Route path='/dashboard/users' element={<Users />} />
        <Route path='/dashboard/payments' element={<Payments />} />
        <Route path='/dashboard/paymentslist' element={<PaymentList />} />
        <Route path='/dashboard/orders' element={<Orders />} />
        <Route path='/dashboard/pay' element={<PaymentsPage />} />
        {/* Add more routes for other admin-related components */}
      </Routes>

    </div>
  )
}

// export default function App () {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/dashboard/*' element={<AdminPage />} />
//       </Routes>
//     </Router>
//   )
// }

export default AdminPage
