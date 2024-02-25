import React from 'react'
import { FiHome } from 'react-icons/fi'
import { IoFastFoodSharp } from 'react-icons/io5'

export const links = [
  {
    id: 1,
    icon: <FiHome />,

    text: 'Home',
    url: '/'
  },
  {
    id: 2,
    text: 'About',
    url: '/about'
  },
  {
    id: 3,
    text: 'Foods',
    icon: <IoFastFoodSharp />,

    url: '/foods'
  },
  {
    id: 4,
    text: 'Contact us',
    url: '/contact'
  }
]
// export const icons = [
//   {
//     id: 6,
//     home: <FiHome />
//   },
//   {
//     id: 7,
//     products: <IoFastFoodSharp />
//   }
// ]

export const foods_url = 'http://localhost:5000/api/v1/foods/getAllFoods'
export const single_food_url =
  'http://localhost:5000/api/v1/foods/getsingleFood/'
export const register_user_url = 'http://localhost:5000/api/v1/auth/register'
export const forgot_password_url =
  'http://localhost:5000/api/v1/auth/forgotPassword'
export const login_user_url = 'http://localhost:5000/api/v1/auth/login'
export const logout_user_url = 'http://localhost:5000/api/v1/auth/logout'
export const create_orders_url =
  'http://localhost:5000/api/v1/orders/createOrder'
// export const single_user_url = 'http://localhost:5000/api/v1/users/'
export const update_user_url = 'http://localhost:5000/api/v1/users/'

//ADMIN
export const uploadImage_url = 'http://localhost:5000/api/v1/foods/uploadImage'
export const get_all_foods_images_url =
  'http://localhost:5000/api/v1/foods/getFoodImages'
// export const update_food_url = 'http://localhost:5000/api/v1/foods/id'
export const all_users_url = 'http://localhost:5000/api/v1/users/getAllUsers'
export const single_user_url = 'http://localhost:5000/api/v1/users/'

export const create_food_url = 'http://localhost:5000/api/v1/foods/createFood'
export const update_food_url = 'http://localhost:5000/api/v1/foods/'
export const delete_food_url = 'http://localhost:5000/api/v1/foods/'
export const checkout_url = 'http://localhost:5000/api/v1/orders/checkout'
export const all_orders_url = 'http://localhost:5000/api/v1/orders/getAllOrders'
export const single_order_url = 'http://localhost:5000/api/v1/orders/'
export const all_payments_url =
  'http://localhost:5000/api/v1/payment/getAllPayments'
export const checkToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    // setIsTokenPresent(true)
    return true
  }
  return false
}
