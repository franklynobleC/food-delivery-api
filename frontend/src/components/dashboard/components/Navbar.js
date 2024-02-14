import React from 'react'
import { dashboardLinks } from '../utils/constants'
//  '../../../styles/admindashboard/sidebar'
import '../../../styles/admindashboard/sidebar.css'
import { Link, Nav } from 'react-router-dom'
import '../../../styles/fonts.css'

function Navbar () {
  return (
    <nav className='sidebar'>
      <h1>Navbar Page Admin Dashboard</h1>
      <div>
        {dashboardLinks.map((links, index) => {
          const { id, text, url } = links
          return (
            <div key={index} className='sidebar-links'>
              <Link to={url} id={id}>
                <div className='sidebar-link'>{text}</div>
              </Link>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
