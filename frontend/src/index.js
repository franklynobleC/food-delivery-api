import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Root from './App'
import { FoodsProvider } from './context/foods_context'
import { CartProvider } from './context/cart_context'
import { AuthProvider } from './context/auth_context'
import { UserProvider } from './context/user_context'
import { AdminProvider } from './context/admin_context'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <UserProvider>
      <AdminProvider>
        <FoodsProvider>
          <CartProvider>
            <Root />
          </CartProvider>
        </FoodsProvider>
      </AdminProvider>
    </UserProvider>
  </AuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
