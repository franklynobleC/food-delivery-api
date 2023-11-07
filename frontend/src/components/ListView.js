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
        const { name, price, image, id, quantity } = food
        return (
          <div key={id} className='food-container'>
            <div className='food-image-container'>
              <img src={image} alt={name} className='food-image' />
            </div>
            <div className='food-name'>
              <h4>{name}</h4>
              <h4>{quantity}</h4>
            </div>
            <div className='food-price'>Price: &#8358;{price}</div>
            <div className='food-description'></div>
            <div className='details-link'>
              <Link to={`/foods/${id}`} className='Details-link'>
                <button className='oder-now-btn'>Order now</button>
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
