'use client'
import React, { useState } from 'react'

// import { Link } from 'react-router-dom'
import { useFoodsContext } from '../context/foods_context'
import { useAuthContext } from '../context/auth_context'
import ListView from './ListView'

const FoodList = () => {
  const { foods, UserToken } = useFoodsContext()
  const { token ,user} = useAuthContext()
  const [searchFood, setSearchFood] = useState('')
  const [searchFoodsResult, setFoodsResult] = useState([])
  console.log("Token from FoodList Component",token)
  if (foods.length === 0) {
    return (
      <div>
        {console.log('TOKEN FROM  FOODlIST>>> No Data Found', token)}
        <h4>foods Data not found</h4>
      </div>
    )
  }
  return (
    <ListView foods={foods}>
      <div>
        <h2>Food List</h2>
      </div>
      {console.log('TOKEN FROM  FOODlIST>>>', token)};
      {console.log('USER FROM  FOODlIST>>>', user)};
    </ListView>
  )
}
export default FoodList
