// This file is part of Foods. Copyright ( C ) 2008 John Resig Inc
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
  if (foods.length === 0     || foods === null) {
    return (
      <div>

        <h4>foods Data not found</h4>
      </div>
    )
  }
  return (
    <ListView foods={foods}>
      <div>
        <h2>Food List</h2>
      </div>

    </ListView>
  )
}
export default FoodList
