import React from 'react'
import 'react-simple-toasts/dist/theme/success.css'
import 'react-simple-toasts/dist/theme/success.css'
import toast, { toastConfig } from 'react-simple-toasts'

const AlertMessage = ({ toastTheme, message }) => {
  toastConfig({ theme: toastTheme, position: 'top-right' })

  return (
    <>
      <div>{toast(message)}</div>
    </>
  )
}

export default AlertMessage
