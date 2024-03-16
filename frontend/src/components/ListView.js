import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

import '../styles/foods.css'
import '../styles/filteredFood.css'
import '../icons/search-icon.png'
import { AddToCart } from '../components'

import '../images/icons/search-icon.png'
import { useCartContext } from '../context/cart_context'
import 'react-simple-toasts/dist/theme/success.css'
import { toastConfigAlert, ShowToast } from '../toastConfigAlert'

const ListView = ({ foods }) => {
  let navigate = useNavigate()
  const { addToCart, cart, _id } = useCartContext()
  const [quantity, setQuantity] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  const [searchFood, setSearchFood] = useState('')
  const [searchFoodsResult, setFoodsResult] = useState([])

  const handSearchSubmit = e => {
    e.preventDefault()

    const results = foods.filter(food =>
      food.name.toLowerCase().includes(searchFood.toLowerCase())
    )

    setFoodsResult(results)
    if (results) {
      setSearchFood('')
      return
    }
  }
  const handleAddToCart = (id, food) => {
    const { _id } = food
    // console.log('THIS IS  FROM FOOD   ADD TO CART', food)
    addToCart(id, quantity, food)

    setIsAdded(true)
    toastConfigAlert.theme = 'success'
    ShowToast('Item successfully added to cart')

    console.log('Add To Cart Now')

    return (window.location.href = '/cart')
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
          <Wrapper>
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
                {/* <Link to={`/foods/${id}`} className='Details-link'>
                </Link> */}
                <button
                  className='oder-now-btn'
                  onClick={() => handleAddToCart(id, food)}
                >
                  Order now
                </button>
              </div>
              <div>
                <AddToCart food={food} />
              </div>

              <div className='food-spacer'></div>
            </div>
          </Wrapper>
        )
      })}
    </section>
  )
}
const Wrapper = styled.section`
  img {
    width: 100%;
    height: 100%;
    /* border: 5px; */
    border-radius: 4px;
  }

  .food-container {
    border-radius: 4px;
    /* width: 30%; */
    height: auto;
    width: auto;
    background-color: whitesmoke;
    margin-left: 100px;
    margin-right: 100px;
    /* padding: 0 */
  }
  .search-input-search {
    border: 1px solid #cecece;
    border-radius: 5px;
    color: #e0eafc;
  }
  /* @media (max-width: 600px) {
    .food-container {
      width: 50%;

      padding: 10px;
    } */
  box-sizing: border-box;
  /* width: auto; */
  background-color: whitesmoke;
`
export default ListView
