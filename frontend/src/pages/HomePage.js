import React from 'react'

import { Hero, Services } from '../components/index'
import interswitchimage from '../images/homeimage/interswitchimage.png'
import  '../styles/home.css'
const HomePage = () => {
  return (
    <main className='home-page'>
      <div>
        <h2>Home Page</h2>
      </div>
      <div className='interswitch-image-container'>
        <img src={interswitchimage} alt='interswitch' className='interswitch-image' />
      </div>
      <Hero />

      <Services />
    </main>
  )
}

export default HomePage
