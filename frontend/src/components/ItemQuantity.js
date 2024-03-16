import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
// import  { useFoodsContext } from '../context/food_context'
import { useFoodsContext } from '../context/foods_context'
const ItemQuantity = ({ quantity }) => {
  const { foods } = useFoodsContext()

  const { foodQuantity, cart } = useCartContext()
  let [quantityData, setQuantityData] = useState(quantity)
  const handleIncrease = () => {
    setQuantityData(quantityData => quantityData + 1)
    console.log('quantityData', quantityData)
    console.log('state')
    // return foodQuantity(quantityData)
  }
  const handleDecrease = () => {
    setQuantityData(quantityData => quantityData - 1)
    console.log('quantityData')
    // return foodQuantity(quantityData)
  }
  return (
    <div>
      <button type='button' onClick={() => handleIncrease()}>
        Increase
      </button>
      <span>{quantityData}</span>
      <button onClick={() => handleDecrease()}>Decrease</button>
    </div>
  )
}

export default ItemQuantity
