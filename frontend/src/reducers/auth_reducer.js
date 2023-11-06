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

const auth_reducer = (state, action) => {
  if (action.type === REGISTER_USER) {
    console.log('FROM REGISTER USER REDUCER')
    console.log(action.payload)
    state.user = action.payload
    console.log(state.user)
    return { ...state, register_loading: false, user: action.payload }
  }
  if (action.type === REGISTER_SUCCESS) {
    console.log('FROM REGISTER USER Success REDUCER')
    console.log(action.payload.user)

    return {
      ...state,
      register_loading: false,
      register_error: false,
      loading: false,

      is_registered: true,
      isAuthenticated: true,
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
      error: true,
      user: null
    }
  }

  if (action.type === LOGIN_USER_BEGIN) {
    console.log('LOGIN  BEGIN')

    console.log('fromLOGINSUCCESS PAYLOAD', action.payload)
    return {
      ...state,
      register_loading: true,
      loading: true,
      register_error: false,
      is_registered: false,
      user: null
    }
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    console.log('LOGIN SUCCESS FROM  REDUCERS')
    const { userId, name } = action.payload
    console.log('FROM  PAYLOAD LOGIN REDUCERS  TEST', userId, name)
    return {
      ...state,
      register_loading: false,
      register_error: false,
      is_registered: true,
      is_logged_in: true,
      loading: false,

      isAuthenticated: true,
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
      error: true,
      user: null
    }
  }
  throw new Error(`No matching ${action.type}-action  type`)
}

//TODO:  handle add  user  Login  and  USER lOGGED out action

export default auth_reducer