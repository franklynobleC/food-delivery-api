import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { Alert } from '@mui/material'

// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

import '../styles/foods.css'
import '../styles/filteredFood.css'
import '../icons/search-icon.png'
import { AddToCart } from '../components'

import '../images/icons/search-icon.png'
import { useCartContext } from '../context/cart_context'

const ListView = ({ foods }) => {
  const [searchFood, setSearchFood] = useState('')
  const [searchFoodsResult, setFoodsResult] = useState([])

  const handSearchSubmit = e => {
    e.preventDefault()
    // console.log(foods)

    const results = foods.filter(food =>
      food.name.toLowerCase().includes(searchFood.toLowerCase())
    )

    setFoodsResult(results)
    if (results) {
      setSearchFood('')
      return
    }
  }

  if (searchFoodsResult.length > 0) {
    return (
      <div className='main-search-background'>
        <div className='main-search'>
          {searchFoodsResult.map(food => {
            const { name, price, image, id, quantity } = food

            return (
              <section className=''>
                <div key={id} className='food-container-search'>
                  <div className='food-image-container'>
                    <img src={image} alt={name} className='food-image-search' />
                  </div>
                  <div className='food-name-search'>
                    <h4>{name}</h4>
                  </div>
                  <div className='food-price-search'>
                    Price: &#8358; {price}
                  </div>
                  <div className='food-description-search'></div>
                  <div className='details-link-search'>
                    {/*
                  // <button type='click' onClick={() => addToCart(id, quantity, food)}>
                  //   {' '}
                  //   Add to Cart
          // </button>
            */}
                    <Link to={`/foods/${id}`} className='Details-link-search'>
                      <button className='oder-now-btn-search'>Order now</button>
                    </Link>
                  </div>

                  <div className='food-spacer-search'></div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <section className='main'>
      <div className='form-container'>
        <form onSubmit={handSearchSubmit} className='search-bar'>
          <input
            type='text'
            required
            className='search-input-search'
            value={searchFood}
            placeholder='Search meal'
            onChange={e => setSearchFood(e.target.value)}
          />
          <button type='submit' className='search-btn'>
            <FiSearch className='search-bar-icon' />
          </button>
        </form>
      </div>

      {foods.map(food => {
        const { name, price, image, id, quantity } = food
        return (
          <div key={id} className='food-container'>
            <div className='food-image-container'>
              <img src={image} alt={name} className='food-image' />
            </div>
            <div className='food-name'>
              <h4 className='food-h4'>{name}</h4>
            </div>
            <div className='food-price'>Price: &#8358;{price}</div>
            <div className='food-description'></div>
            <div className='details-link'>
              <Link to={`/foods/${id}`} className='Details-link'>
                <button className='oder-now-btn'>Order now</button>
              </Link>
            </div>
            <div>
              <AddToCart food={food} />
            </div>

            <div className='food-spacer'></div>
          </div>
        )
      })}
    </section>
  )
}
export default ListView
