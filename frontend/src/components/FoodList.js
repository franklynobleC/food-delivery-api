'use client'
import React, { useState } from 'react'

// import { Link } from 'react-router-dom'
import { useFoodsContext } from '../context/foods_context'
import { useAuthContext } from '../context/auth_context'
import ListView from './ListView'

const FoodList = () => {
  const { foods,UserToken } = useFoodsContext()
  const { token } = useAuthContext()
  const [searchFood, setSearchFood] = useState('')
  const [searchFoodsResult, setFoodsResult] = useState([])
console.log(token)
  if (foods.length < 1) {
    return (
      <div>
        {console.log('TOKEN FROM  FOODlIST>>>')}
        <h4>foods Data not found</h4>
      </div>
    )
  }
  if (token) {
    return (
      <ListView foods={foods}>
        <div>
          <h2>Food List</h2>
        </div>
        {console.log('TOKEN FROM  FOODlIST>>>', token)};
      </ListView>
    )
  }
  return (
    <div>
 {console.log('Error from foods replay')}
      <h2>Error1</h2>
      <h2>Error1</h2>
      <h2>Error1</h2>
      <h2>Error1</h2>
      <h2>Error1</h2>
    </div>
  )
}
export default FoodList
