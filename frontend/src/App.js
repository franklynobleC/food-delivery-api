import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, About, Foods, Error, SingleFood } from './pages/'
import { Footer } from './components/'

function App () {
  return (
    <Router>
      {/*// add Navbar and Side Bar here  */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='foods' element={<Foods />} />
        <Route path='foods/:id' element={<SingleFood />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
