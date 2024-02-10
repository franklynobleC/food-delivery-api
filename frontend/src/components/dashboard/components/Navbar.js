import React from 'react'
import { dashboardLinks } from '../utils/constants'
//  '../../../styles/admindashboard/sidebar'
import '../../../styles/admindashboard/sidebar.css'
import { Link, Nav } from 'react-router-dom'
import '../../../styles/fonts.css'

function Navbar () {
  return (
    // <nav className='sidebar'>
    //   <div class='sidebar-link'>
    //     <img src='/icons/home.svg' />
    //     <div>Home</div>
    //   </div>

    //   <div class='sidebar-link'>
    //     <img src='icons/explore.svg' />
    //     <div>Explore</div>
    //   </div>
    //   <div class='sidebar-link'>
    //     <img src='icons/subscriptions.svg' />
    //     <div>Subscriptions</div>
    //   </div>
    //   <div class='sidebar-link'>
    //     <img src='icons/originals.svg' />
    //     <div>Originals</div>
    //   </div>
    //   <div class='sidebar-link'>
    //     <img src='icons/youtube-music.svg' />
    //     <div>Youtube Music</div>
    //   </div>
    //   <div class='sidebar-link'>
    //     <img src='icons/library.svg' />
    //     <div>Library</div>
    //   </div>
    // </nav>
    <nav className='sidebar'>
      <h1>Navbar Page</h1>
      <div>
        {dashboardLinks.map((links, index) => {
          const { id, text, url } = links
          return (
            <div key={index}>
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
