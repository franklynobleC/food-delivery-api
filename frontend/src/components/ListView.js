import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/foods.css'
import '../styles/filteredFood.css'
import { useFoodsContext } from '../context/foods_context'

const ListView = ({ foods }) => {
  // const { foods } = useFoodsContext()

  const [searchFood, setSearchFood] = useState('')
  const [searchFoodsResult, setFoodsResult] = useState([])
  const handSearchSubmit = e => {
    e.preventDefault()
    // console.log(foods)
    const results = foods.filter(food =>
      food.name.toLowerCase().includes(searchFood.toLowerCase())
    )

    setFoodsResult(results)
    console.log(results)
  }

  if (searchFoodsResult.length > 0) {
    return (
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
                  <h4>{quantity}</h4>
                </div>
                <div className='food-price-search'>Price: &#8358;{price}</div>
                <div className='food-description-search'></div>
                <div className='details-link-search'>
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
    )
  }

  return (
    <section className='main'>
      <div className='form-container'>
        <form onSubmit={handSearchSubmit}  className='search-bar'>
          <input
            type='text'
            required
            className='search-input-search'
            value={searchFood}
            placeholder='Search your favorite meal'
            onChange={e => setSearchFood(e.target.value)}
          />
          <button type='submit'>search</button>
        </form>
        //{' '}
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
