import React from 'react'
import 'react-simple-toasts/dist/theme/success.css'
import 'react-simple-toasts/dist/theme/success.css'
import toast, { toastConfig } from 'react-simple-toasts'

export const toastConfigAlert = {
  position: 'top-right',
  autoClose: 3000,
  theme: ''
}

export const ShowToast =
  (message = {}) => {
    toast(message, { ...toastConfigAlert, })
  }
