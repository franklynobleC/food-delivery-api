import React from 'react'
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/'
  },
  {
    id: 2,
    text: 'about',
    url: '/about'
  },
  {
    id: 3,
    text: 'foods',
    url: '/foods'
  },
  {
    id: 4,
    text: 'contact us',
    url: '/contact'
  }
]

export const foods_url = 'http://localhost:5000/api/v1/foods/getAllFoods'
export const single_food_url = 'http://localhost:5000/api/v1/foods/getsingleFood/'
