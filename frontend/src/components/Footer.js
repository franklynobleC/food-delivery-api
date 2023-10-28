import React from 'react'

const Footer = () => {
  return (
    <footer>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> Food Delivery </span>
      </h5>
      <h5>All rights reserved</h5>
    </footer>
  )
}

export default Footer
