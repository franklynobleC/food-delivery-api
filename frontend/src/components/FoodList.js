// This file is part of Foods. Copyright ( C ) 2008 John Resig Inc
'use client'
import React, { useState } from 'react'
import styled from 'styled-components'

// import { Link } from 'react-router-dom'
import { useFoodsContext } from '../context/foods_context'
import { useAuthContext } from '../context/auth_context'
import ListView from './ListView'

const FoodList = () => {
  const { foods, UserToken } = useFoodsContext()
  const { token, user } = useAuthContext()
  const [searchFood, setSearchFood] = useState('')
  const [searchFoodsResult, setFoodsResult] = useState([])
  console.log('Token from FoodList Component', token)
  if (foods.length === 0 || foods === null) {
    return (
      <div>
        <h4>foods Data not found</h4>
      </div>
    )
  }
  return (
    <div className='food-list'>
      {/* {foods
        .filter((item, index) => item.category)
        .map(item => {
          const { name, image, price } = item
          return (
            <div>
              <p>{name}</p>
              <p>{image}</p>
            </div>
          )

          {
            /* return <ListView foods={item} /> */}
      {/* })} */}
      <div>
        <Wrapper>
          <div className='section'>
            <ListView foods={foods} />
          </div>
        </Wrapper>
        <h2>Food List</h2>
      </div>
    </div>
  )
}

const Wrapper = styled.section`
  margin-top: 50px;
  background-color: red;
`
export default FoodList
