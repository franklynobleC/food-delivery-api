import React from 'react'
import '../../../styles/admindashboard/addFood.css'
function AddFoods () {
  return (
    <div className='add-food-component'>
      UpDate Food
      <form action=''>
        <label htmlFor=''>name</label>
        <input type='text' name='' id='' />;
        <label htmlFor=''>description</label>
        <input type='text' name='' id='' />
        <label htmlFor=''>price</label>
        <input type='text' name='' id='' />
        <input type='text' name='' id='' />
      </form>
    </div>
  )
}

export default AddFoods
