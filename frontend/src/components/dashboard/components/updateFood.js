import React, { useEffect, useState } from 'react'
import '../../../styles/admindashboard/foods.css'
import { useFoodsContext } from '../../../context/foods_context'

function UpdateFood ({ id }) {
  const { fetchSingleFood, single_food, is_data_fetched } = useFoodsContext()
  const [editFood, setEditFood] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  })

  const [isAddFood, setIsAddFood] = useState(false)
  const handleChange = e => {
    // e.preventDefault()
    setEditFood({
      ...editFood,
      [e.target.name]: e.target.value
    })
    console.log('All Foods Data', editFood)
  }
  const handleAddFood = () => {
    setIsAddFood(!isAddFood)
  }
  const handleCreateFood = async () => {}

  useEffect(() => {
    console.log('Food ID', id)
    console.log('handle From Foods Update Data', id)

    setEditFood({
      name: single_food.name,
      description: single_food.description,
      price: single_food.price,
      category: single_food.category
    })
  }, [])

  {
    if (isAddFood) {
      return (
        <div className='add-food-component'>
          <form onSubmit={handleCreateFood} className='food-form'>
            <div className='close-div'>
              <button
                className='btn-close'
                type='button'
                onClick={() => handleAddFood()}
              >
                close
              </button>
            </div>
            <div className='add-food-inputs'>
              Update Food
              <div className='input-group'>
                <label htmlFor='' className='label-input'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  className='input'
                  // value={editFood.name}
                  onChange={handleChange}
                  defaultValue={editFood.name}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='' className='label-input'>
                  Description
                </label>
                <input
                  type='text'
                  name='description'
                  className='input'
                  // value={setEditFood.description}
                  onChange={handleChange}
                  defaultValue={editFood.description}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='' className='label-input'>
                  Price
                </label>
                <input
                  type='text'
                  name='price'
                  className='input'
                  onChange={handleChange}
                  // value={editFood.price}
                  defaultValue={editFood.price}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='' className='label-input'>
                  category
                </label>
                <input
                  type='text'
                  // defaultValue={editFood.category}
                  name='category'
                  className='input'
                  onChange={handleChange}
                  value={editFood.category}
                />
              </div>
              <button
                type='button'
                // onClick={() => handleUploadImage()}
                className='btn-upload'
              >
                upload image
              </button>
            </div>
            <button type='submit' className='btn-save'>
              update
            </button>
          </form>
        </div>
      )
    } else {
      <></>
    }
  }
}

export default UpdateFood
