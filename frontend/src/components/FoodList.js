import React from 'react'
import { useFoodsContext } from '../context/foods_context'
const FoodList = () => {
  const { foods } = useFoodsContext()
  if (foods.length > 0) {
    return (
      <div>
        {foods.map(food => (
          <div key={food.id}>{console.log(food)}</div>
        ))}
      </div>
    )
  }
  return (
    <div>
      <p>No data found in foods</p>
    </div>
  )
}
export default FoodList
