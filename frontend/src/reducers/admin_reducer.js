import {
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_PAYMENTS,
  GET_ALL_PAYMENTS_ERROR
} from '../actions'

const admin_reducer = (state, action) => {
  if (action.type === GET_ALL_ORDERS_SUCCESS) {
    return { ...state, orders: action.payload }
  }
  if (action.type === GET_ALL_PAYMENTS) {
    return { ...state, payments: action.payload }
  }

  if (action.type === GET_ALL_PAYMENTS_ERROR) {
    return { ...state, payments_error: true, payments: null }
  }

  if (action.type === GET_ALL_ORDERS_ERROR) {
    return { ...state, orders_error: true, orders: null }
  }

  throw new Error(`No matching ${action.type} - action type`)
}

export default admin_reducer
