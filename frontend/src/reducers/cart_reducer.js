import {
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  ADD_TO_CART,
  CREATE_ORDER_BEGIN,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  COUNT_SINGLE_FOOD_QUANTITY
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, quantity, food } = action.payload
    //check  if id  is  found  in  cart  array
    const tempItem = state.cart.find(i => i.id === id)
    if (tempItem) {
      console.log('ADD TO CART>>>>>>', tempItem)

      //check if  the  item  is  in  the     Cart,  iterate  over it
      const tempCart = state.cart.map(cartItem => {
        if (cartItem.id === id) {
          let newQuantity = cartItem.quantity + quantity

          return { ...cartItem, quantity: newQuantity }

          //if  item  is  found  in  cart  array  update  amount
        } else {
          return cartItem
        }
      })
      //save  cart  in  localStorage
      //TODO: COMMENT TO  TRY  OUT IF  THIS  WORKS
      localStorage.setItem('cart', JSON.stringify(tempCart))
      return { ...state, cart: tempCart, delivery_fee: 100 }
    } else {
      //if  item  is  not  found  in  cart  array  add  it
      const newItem = {
        id: id,
        name: food.name,
        quantity: food.quantity,
        image: food.image,
        price: food.price
      }
      return { ...state, cart: [...state.cart, newItem], delivery_fee: 100 }
    }
  }
  if (action.type === COUNT_CART_TOTALS) {
    //TODO:  change  the Delivery   fee  to  use    Dynamically
    const { total_price, total_quantity } = state.cart.reduce(
      (total, cartItem) => {
        const { price, quantity } = cartItem
        {
          /*calculate  the amount of  item(total quantity of  item)*/
        }
        total.total_quantity += quantity
        total.total_price += price * quantity
        console.log('TOTAL>>>>>>>>>', total)

        return total
      },
      {
        total_price: 0,
        total_quantity: 0
      }
    )
    console.log(total_price, total_quantity)
    return { ...state, total_price, total_quantity, delivery_fee: 100 }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }

  // if (action.type === COUNT_SINGLE_FOOD_QUANTITY) {
  //   const { quantity } = action.payload
  //   console.log(action.payload)
  //   console.log('SINGLE QUANTITY', quantity)
  //   let tempCart = state.cart.map(itemCart => {
  //     const { price, quantity } = itemCart
  //     itemCart.quantity = action.payload
  //     itemCart.price = quantity * price
  //   })
  //   return {
  //     ...state,
  //     quantity: action.payload
  //   }
  // }
  //remove single item  from cart
  if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload
    console.log(state.cart)
    let tempcart2 = state.cart
    console.log('IS ID>>>', id)
    let filteredOrder = tempcart2.filter(item => item.id !== id)
    return { ...state, cart: filteredOrder }
  }

  if (action.type === CREATE_ORDER_BEGIN) {
    console.log('ORDER CREATE BEGIN')

    return {
      ...state,
      is_loading: true,
      is_order_created_success: false,
      is_order_error: false,
      delivery_fee: 0,

      order: null
    }
  }

  if (action.type === CREATE_ORDER_SUCCESS) {
    console.log('ORDER CREATE SUCCESS')

    console.log('from Action PayLoad', action.payload)

    return {
      ...state,
      is_loading: false,
      is_order_created_success: true,
      is_order_error: false,
      delivery_fee: 100,

      order: action.payload
    }
  }
  if (action.type === CREATE_ORDER_ERROR) {
    console.log('ORDER CREATE ERROR')

    return {
      ...state,
      is_loading: false,
      is_order_created_success: false,
      is_order_error: true,
      delivery_fee: 0,
      order: null
    }
  }

  throw new Error(`No matching ${action.type} -action  type`)
  //check for  another Action Dispatch
}

export default cart_reducer
