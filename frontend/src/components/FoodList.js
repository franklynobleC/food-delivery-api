import React from 'react'
// import { Link } from 'react-router-dom'
import { useFoodsContext } from '../context/foods_context'
import ListView from './ListView'
const FoodList = () => {
  const { foods } = useFoodsContext()
  if (foods.length < 1) {
    return (
      <div>
      <h4>foods Data not found</h4>
      </div>
      )

  }
  return <ListView foods={foods}>food list </ListView>
}
export default FoodList
