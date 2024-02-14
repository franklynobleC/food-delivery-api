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
import Foods from '../dashboardPages/FoodPage'

import Navbar from '../../components/dashboard/components/Navbar'
import SingleOrder from '../../components/dashboard/components/SingleOrder'

import '../../styles/admindashboard/adminPage.css'
import '../../styles/fonts.css'

const AdminPage = () => {
  return (
    <div className='admin-body'>
      {/* Add any common layout or navigation for the admin section */}
      <h1>Admin Dashboard page</h1>

      <Navbar />

      <Routes>
        <Route path='/' element={<Admin />} />
        <Route path='users' element={<Users />} />
        <Route path='foods' element={<Foods />} />
        <Route path='payments' element={<Payments />} />
        <Route path='paymentslist' element={<PaymentList />} />
        <Route path='orders' element={<Orders />} />
        <Route path='orders/:id' element={<SingleOrder />} />
        <Route path='payments' element={<PaymentsPage />} />
        {/* Add more routes for other admin-related components */}

        <Route
          path='*'
          element={
            <div>
              <h2>SOMETHING WENT WRONG</h2>
            </div>
          }
        />
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
