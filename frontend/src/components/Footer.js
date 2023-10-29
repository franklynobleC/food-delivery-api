import React from 'react'
import '../styles/footer.css'
const Footer = () => {
  return (
    <footer>
      <div className='footer-div'>
        <h5>
          &copy; {new Date().getFullYear()}
          <span> Food Delivery </span>
        </h5>
        <h5>All rights reserved</h5>
      </div>
    </footer>
  )
}

export default Footer
