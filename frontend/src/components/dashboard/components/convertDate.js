import React from 'react'
import moment from 'moment'

export const convertDate = dateData => {

console.log(dateData)
  return moment(dateData).format('DD/MM/YYYY, h:mm:ss a')
}
