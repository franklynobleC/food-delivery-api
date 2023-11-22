import React from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { Hero, Services, SvgComponent } from '../components/index'
import pizzaHome from '../images/pizzaHome.jpg'
import beefburger from '../images/beefburger.png'
import removal from '../images/removal.png'
import freshVeg from '../images/freshVeg.jpg'
import interswitchimage from '../images/interswitchimage.png'
import '../styles/home.css'

const HomePage = () => {
  return (
    <div>
      <div className='home-page'>
        <div className='grid'>
          <div className='content'>
            <div className='content-left'>
              <div className='info'>
                <h2>
                  Order Your Best <br /> Food anytime
                </h2>
                <p>
                  Hey, Our Delicious food is waiting for you, we are Always near
                  to you ,<br /> with fresh Items
                </p>
              </div>
              <Link to='/foods'>
                <button>Explore Food</button>
              </Link>
            </div>
            <div className='content-right'>
              <img src={removal} alt='' className='food-img' />
            </div>
          </div>
        </div>
        {/*CARDS    */}
        <section className='category'>
          <div className='list-items'>
            <h3>Popular Dishes</h3>
            <div className='card-list'>
              <div className='card'>
                <img src={beefburger} alt='beefBurger' className='home-img' />
                <div>
                  <h1>Beef Burger</h1>
                </div>
                <div className='desc-food'>
                  <p>
                    Quaerat iusto digniss Corp Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Quis vitae reprehenderit quos
                    vol
                  </p>
                </div>
                <div className='price'>
                  <span>N 2000</span>
                </div>
              </div>
              <div className='card'>
                <img src={beefburger} alt='beefBurger' className='home-img' />
                <div>
                  <h1>Beef Burger</h1>
                </div>
                <div className='desc-food'>
                  <p>
                    Quaerat iusto digniss Corp Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Quis vitae reprehenderit quos
                    vol
                  </p>
                </div>
                <div className='price'>
                  <span>N 2000</span>
                </div>
              </div>
              <div className='card'>
                <img src={beefburger} alt='beefBurger' className='home-img' />
                <div>
                  <h1>Beef Burger</h1>
                </div>
                <div className='desc-food'>
                  <p>
                    Quaerat iusto digniss Corp Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Quis vitae reprehenderit quos
                    vol
                  </p>
                </div>
                <div className='price'>
                  <span>N 2000</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='interswitch-image-container'>
          <img
            src={interswitchimage}
            alt='interswitch'
            className='interswitch-image'
          />
        </div>
        <Services />
      </div>
      <SvgComponent />
    </div>
  )
}

export default HomePage
