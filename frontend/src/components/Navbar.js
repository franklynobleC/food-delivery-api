import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import  '../styles/header/navbar.css'
const Nav = () => {
  return (
    <nav className='nav-links'>
      <div className='nav-center'>
        <div className='nav-header'></div>
        <ul className='nav-links'>
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link to={link.url}>{link.text}</Link>
              </li>
            )
          })}
          {/* add my user,  if  user? show check out  page   */}
        </ul>
      </div>
    </nav>
  )
}
export default Nav
