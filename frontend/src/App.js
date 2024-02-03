// import '/App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

import { Footer, Navbar, Contact, Login, PasswordReset } from './components/'

function App () {
  return (
    <AuthWrapper>
      <Router>
        {/*// add Navbar and Side Bar here  and side bar */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          // <Route path='foods' element={<Foods />} />
          <Route path='/signin' element={<Auth />} />
          <Route path='/login' element={<Login />} />
          <Route path='/foods/:id' element={<SingleFood />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/passwordReset' element={<PasswordReset />} />
          <Route path='/actualcheckOut' element={<ActualCheckOut />} />
          <Route
            path='/foods'
            element={
              <PrivateRoute>
                <Foods />
              </PrivateRoute>
            }
          />

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
      </Router>
    </AuthWrapper>
  )
}

export default App
