import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { single_food_url as single_url } from '../utils/constants'
import {} from '../components/'
import { useFoodsContext } from '../context/foods_context'
import '../styles/singlefood.css'
const SingleFoodPage = () => {
  //Get Params  id  from  the request  current url
  const { id } = useParams()

  const navigate = useNavigate()
  //pass all  the  values from  the state in    useContext  then  use against  the  actions
  const {
    single_food_error: error,
    single_food_loading: loading,
    single_food: food,
    fetchSingleFood
  } = useFoodsContext()

  useEffect(() => {
    fetchSingleFood(`${single_url}${id}`)
  }, [id])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [error])
  if (loading) {
    return (
      <div class=''>
        <h2>Loading....</h2>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <h1>an error occurred</h1>
      </div>
    )
  }
  const { name, image, description, price } = food

  return (
    <section className='single-food-container'>
      <div className='single-food-image-container'>
        <img src={image} alt={name} className='single-food-image' />
      </div>
      <div className='single-food-details-container'>
        <div className='single-item-name'>{name}</div>
        <div className='single-item-price'>{price}</div>
        <div className='single-item-description'>{description}</div>
      </div>
      <hr />
      <Link to={`/foods`} className='link'>
        back to foods
      </Link>
      <div className='spacer'></div>
      <Link to='/cart'>
        <button className='add-to-cart-btn'>add to cart</button>
      </Link>
    </section>
  )
}
export default SingleFoodPage
