import {
  REGISTER_SUCCESS,
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_USER,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS
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
      is_registered: true,
      user: action.payload
    }
  }

  if (action.type === REGISTER_ERROR) {
    console.log('from reducers register Error')
    return {
      ...state,
      register_loading: false,
      is_registered: false,
      register_error: true,
      user: null
    }
  }

  if (action.type === LOGIN_USER_BEGIN) {
    console.log('LOGIN  BEGIN')
    return {
      ...state,
      register_loading: true,
      register_error: false,
      is_registered: false,
      user: null
    }
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    login('LOGIN SUCCESS FROM  REDUCERS')
    return {
      ...state,
      register_loading: false,
      register_error: false,
      is_registered: true,
      user: action.payload
    }
  }
  if (action.type === LOGIN_USER_ERROR) {
    console.log('USER LOGIN ERROR FROM  REDUCER')
    return {
      ...state,
      is_registered: false,
      register_loading: false,
      register_error: true,
      user: null
    }
  }
  throw new Error(`No matching ${action.type}-action  type`)
}

//TODO:  handle add  user  Login  and  USER lOGGED out action

export default user_reducer
