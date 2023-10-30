import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { single_food_url as single_url } from '../utils/constants'
import {} from '../components/'
import { useFoodsContext } from '../context/foods_context'

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
      }, 2000)
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
    <section>
      <div>
        <img src={image} alt={name} />
        <Link to={`/foods`} className='link'></Link>
        back to foods
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{price}</p>
        <p>{description}</p>
        <img src={image} alt='' />
      </footer>
      <p>Single Product Page</p>
    </section>
  )
}
export default SingleFoodPage
