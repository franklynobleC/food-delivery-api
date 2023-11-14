import React, { useState } from 'react'
import {
  GET_FOODS_BEGIN,
  GET_SINGLE_FOOD_BEGIN,
  GET_SINGLE_FOOD_SUCCESS,
  GET_SINGLE_FOOD_ERROR,
  GET_FOODS_SUCCESS,
  GET_FOODS_ERROR
} from '../actions'

//state is  the  initial state Before the Update
const foods_reducer = (state, action) => {

  if (action.type === GET_FOODS_BEGIN) {
    return { ...state, food_loading: true }
  }

  if (action.type === GET_FOODS_SUCCESS) {
    return { ...state, food_loading: false, foods: action.payload }
  }

  if (action.type === GET_FOODS_ERROR) {
    console.log('All Foods Error>>>>>>>>>>>>>>')
    return {
      ...state,
      single_food_loading: false,
      foods_error: true
    }
  }
  if (action.type === GET_SINGLE_FOOD_BEGIN) {
    return { ...state, single_food_loading: true, single_food_error: false }
  }
  if (action.type === GET_SINGLE_FOOD_SUCCESS) {
    return { ...state, single_food_loading: false, single_food: action.payload }
  }
  if (action.type === GET_SINGLE_FOOD_ERROR) {
    return { ...state, single_food_loading: false, single_food_error: true }
  }
  throw new Error(`No matching ${action.type}- action type`)
}

export default foods_reducer
