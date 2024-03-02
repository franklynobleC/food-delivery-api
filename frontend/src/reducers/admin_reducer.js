import {
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_PAYMENTS,
  GET_ALL_PAYMENTS_ERROR,
  GET_FOODS_SUCCESS,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  GET_SINGLE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_ERROR,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_ERROR,
  CREATE_SINGLE_FOOD_SUCCESS,
  CREATE_SINGLE_FOOD_ERROR,
  GET_IMAGES_SUCCESS,
  GET_IMAGES_ERROR

} from '../actions'

const admin_reducer = (state, action) => {
  if (action.type === GET_ALL_ORDERS_SUCCESS) {
    return { ...state, orders: action.payload }
  }
  if (action.type === GET_SINGLE_ORDER_SUCCESS) {
    const { order } = action.payload

    return { ...state, order: order.OrderItems }
  }
  if (action.type === GET_SINGLE_ORDER_ERROR) {
    return { ...state, single_order: null }
  }
  if (action.type === GET_SINGLE_USER_SUCCESS) {
    return { ...state, singleUser: action.payload }
  }
  if (action.type === GET_SINGLE_USER_ERROR) {
    return { ...state, singleUser: null }
  }
  if (action.type === GET_ALL_PAYMENTS_SUCCESS) {
    return { ...state, payments: action.payload }
  }

  if (action.type === GET_ALL_PAYMENTS_ERROR) {
    return { ...state, payments_error: true, payments: null }
  }

  if (action.type === GET_ALL_ORDERS_ERROR) {
    return { ...state, orders_error: true, orders: null }
  }
  if (action.type === GET_ALL_FOODS_SUCCESS) {
    // const { _id, name } = action.payload
    console.log(action.payload)
    return { ...state, foods_error: false, foods: action.payload }
  }
  if (action.type === GET_ALL_USERS_SUCCESS) {
    return { ...state, users: action.payload }
  }
  if (action.type === CREATE_SINGLE_FOOD_SUCCESS) {
    return { ...state, create_food: action.payload }
  }
  if (action.type === CREATE_SINGLE_FOOD_ERROR) {
    return { ...state, created_food_error: true, create_food: null }
  }
  if (action.type === GET_IMAGES_SUCCESS) {
    console.log('action.payload', action.payload)
    return { ...state, foods_images: action.payload }
  }
  if (action.type === GET_IMAGES_ERROR) {
    return { ...state, foods_images: null }
  }

  if (action.type === GET_ALL_USERS_ERROR) {
    return { ...state, users_error: true, users: null }
  }

  throw new Error(`No matching ${action.type} - action type`)
}

export default admin_reducer
