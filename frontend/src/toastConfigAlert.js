import React from 'react'
// import 'react-simple-toasts/dist/theme/success.css'
import 'react-simple-toasts/dist/theme/success.css'
import toast, { toastConfig } from 'react-simple-toasts'

export const toastConfigAlert = {
  position: 'center',
  autoClose: 1500,
  theme: ''
}

export const ShowToast = (message = {}) => {
  toast(message, { ...toastConfigAlert })
}
