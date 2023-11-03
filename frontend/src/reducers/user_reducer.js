import {
  REGISTER_SUCCESS,
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_USER
} from '../actions'

const user_reducer = (state, action) => {
  if (action.type === REGISTER_USER) {
    console.log('FROM REGISTER USER REDUCER')
    console.log(action.payload)

    return { ...state, register_loading: false, user: action.payload }
  }
  if (action.type === REGISTER_SUCCESS) {
    console.log('FROM REGISTER USER Success REDUCER')
    console.log(action.payload)

    return {
      ...state,
      register_loading: false,
      register_error: false,
      user: action.payload
    }
  }

  if (action.type === REGISTER_ERROR) {
    console.log('from reducers register Error')
    return {
      ...state,
      register_loading: false,
      register_error: true,
      user: null
    }
  }
  throw new Error(`No matching ${action.type}-action  type`)
}

export default user_reducer
