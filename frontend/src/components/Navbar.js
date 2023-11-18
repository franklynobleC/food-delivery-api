import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import { FiHome } from 'react-icons/fi'
import '../styles/header/navbar.css'
const Nav = () => {
  return (
    <nav className='nav-links'>

      <div className='nav-link-user'>
        <ul className='user-ul-container'>
          <li>
            <Link to='login'>login</Link>
          </li>
          <li>
            <Link to='register'>register</Link>
          </li>
        </ul>
      </div>
      <div className='nav-center'>
        <ul className='nav-links-other-url'>
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link to={link.url} className='link-text'>
                  {link.text}
                </Link>
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
