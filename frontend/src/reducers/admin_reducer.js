import {
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_PAYMENTS,
  GET_ALL_PAYMENTS_ERROR,
  GET_FOODS_SUCCESS,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR
} from '../actions'

const admin_reducer = (state, action) => {
  if (action.type === GET_ALL_ORDERS_SUCCESS) {
    console.log('all  Orders payload', action.payload)
    return { ...state, orders: action.payload }
  }
  if (action.type === GET_ALL_PAYMENTS_SUCCESS) {
    console.log('payload data payments', action.payload)
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
    // const { _id, name } = action.payload
    console.log("All  user Data", action.payload)
    return { ...state, users: action.payload }
  }
  if (action.type === GET_ALL_USERS_ERROR) {
    // const { _id, name } = action.payload
    console.log(action.payload)
    return { ...state, users_error: true, users: null }
  }

  throw new Error(`No matching ${action.type} - action type`)
}

export default admin_reducer
