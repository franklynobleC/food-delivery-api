import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/foods.css'

const ListView = ({ foods }) => {
  return (
    <section className='main'>
      <div className='search-bar'>
        <input type='text' className='search-input' placeholder='search menu' />
      </div>
      {foods.map(food => {
        const { name, price, image, id, description } = food
        return (
          <div className='food-container'>
            <div key={id} className='food-image-container'>
              <img src={image} alt={name} className='food-image' />
            </div>
            <div className='food-name'>
              <h4>{name}</h4>
            </div>
            <div className='food-price'>Price: &#8358;{price}</div>
            <div className='food-description'>
              {description.substring(0, 150)}...
            </div>
            <div className='details-link'>
              <Link to={`/foods/${id}`} className='Details-link'>
                <p>Order now</p>
              </Link>
            </div>
            <div className='food-spacer'></div>
          </div>
        )
      })}
    </section>
  )
}
export default ListView
