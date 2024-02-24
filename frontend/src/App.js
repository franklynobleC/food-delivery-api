// import '/App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import {
  Home,
  About,
  Foods,
  Error,
  SingleFood,
  Cart,
  Checkout,
  Auth,
  PrivateRoute,
  AuthWrapper,
  ActualCheckOut
} from './pages'
import { Orders, Payments, Users } from './pages/dashboardPages'

import { Footer, Navbar, Contact, Login, PasswordReset } from './components/'
import {
  OrdersPage,
  PaymentsPage,
  UsersPage
  // AdminPage
} from './pages/dashboardPages'
import AdminPage from './pages/dashboardPages/AdminPage'

export function Root () {
  return (
    <AuthWrapper>
      <Router>
        <App />
      </Router>
    </AuthWrapper>
  )
}

// import {Admin} from './components/dashboard/components'

function App () {
  const location = useLocation()
  //  change  thePathsName to  '/dashboard'
  const isDashboardRoute =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/')
  console.log(location.pathname)

  console.log(isDashboardRoute.valueOf())
  return (
    <>
      {/* // <AuthWrapper> */}
      {/* // <Router> */}
      {/*// add Navbar and Side Bar here  and side bar */}
      {/* {!isDashboardRoute && <Navbar />} */}
      <Navbar />

      <Routes>
        TODO:
        {/* change  path  back to  '/' for HOME PAGE */}
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<AdminPage />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        // <Route path='foods' element={<Foods />} />
        <Route path='/signin' element={<Auth />} />
        <Route path='/login' element={<Login />} />
        <Route path='/foods/:id' element={<SingleFood />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/passwordReset' element={<PasswordReset />} />
        {/* <Route path='/dashboard/users' element={<Users />} /> */}
        {/* TODO:  WRAP   DASHBOARD ROUTE TO A PRIVATE ROUTE */}
        <Route path='dashboard/*' element={<AdminPage />} />
        <Route path='/actualcheckOut' element={<ActualCheckOut />} />
        <Route
          path='/foods'
          element={
            <PrivateRoute>
              <Foods />
            </PrivateRoute>
          }
        />
        TODO:
        {/* ADD  CHECKOUT  PAGE  TO  PROTECTED ROUTE */}
        <Route
        //   path='/checkout'
        //   element={
        //     <PrivateRoute>
        //       <Checkout />
        //     </PrivateRoute>
        //   }
        />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
      {/* // </Router> */}
      {/* // </AuthWrapper> */}
    </>
  )
}

//NOTE: THE MAIN APP COMPONENT WOULD  RENDER   ROOT COMPONENTS  INTO  THE  INDEX  PAGE
export default Root
