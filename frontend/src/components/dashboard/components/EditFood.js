import React, { useEffect, useState } from 'react'
import '../../../styles/admindashboard/foods.css'
import { useFoodsContext } from '../../../context/foods_context'
import { useParams } from 'react-router-dom'

function EditFood () {
  // console.log(Id)
  const { id } = useParams()
  console.log(id)
  const { fetchSingleFood, single_food, is_data_fetched, foods } =
    useFoodsContext()
  const [editFood, setEditFood] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  })

  const [isAddFood, setIsAddFood] = useState(true)
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
    if (!id) {
      console.log('error Returned')
      return
    }
    const data = foods.find(f1 => f1._id === id)
    console.log(data)
    if (data) {
      setEditFood({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        image_url: data.image
      })
    }
  }, [id])

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
            <div>
              <img
                src={editFood.image_url}
                height={100}
                width={100}
                alt='image_data'
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
    ;<></>
  }
}

export default EditFood
