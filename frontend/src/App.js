import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, About, Foods, Error, SingleFood, Cart, Checkout } from './pages'
import { Footer, Navbar, Contact } from './components/'

function App () {
  return (
    <Router>
      {/*// add Navbar and Side Bar here  and side bar */}
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='foods' element={<Foods />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='foods/:id' element={<SingleFood />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
