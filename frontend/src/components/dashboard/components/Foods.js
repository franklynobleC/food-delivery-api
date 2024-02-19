import React, { useState } from 'react'
import { useFoodsContext } from '../../../context/foods_context'
import { useAdminContext } from '../../../context/admin_context'
import '../../../styles/admindashboard/foods.css'
import AddFoods from './AddFoods'
import UploadImg from './UploadImg'
function Foods () {
  const [isAddFood, setIsAddFood] = useState(false)
  const [addFood, setAddFood] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  })
  const [uploadImage, setUploadImage] = useState(false)
  const { fetchFoods, foods } = useFoodsContext()
  const { getAllFoodsImages, foods_images } = useAdminContext()
  const handleAddFood = () => {
    setIsAddFood(!isAddFood)
  }
  const handleUploadImage = () => {
    setUploadImage(!uploadImage)
  }
  const handleChange = e => {
    e.preventDefault()
    setAddFood({
      ...addFood,
      [e.target.name]: e.target.value
    })
    console.log(addFood)
  }
  const handleCreateFood = e => {
    //TODO:  pass    the   method  to  create  new Food item
    e.preventDefault()
    console.log('handle add food called', addFood)
  }
  if (!foods) {
    return <div className='foods-data-parent-div'>Foods Data Not Found</div>
  }
  return (
    <div className='foods-data-parent-div'>
      <div>
        <h3>All Foods</h3>
      </div>
      <div className='add-food-btn-container'>
        <button className='btn-add-food' onClick={() => handleAddFood()}>
          Add food
        </button>
      </div>
      <div className='foods-table-header'>
        <div>Name</div>
        <div>Description</div>
        <div>Category</div>
      </div>
      {foods.map((foodsData, index) => (
        <div key={index} className='foods-data-header'>
          <div className='content'>{foodsData.name}</div>
          <div className='content'>{foodsData.description}</div>
          <div className='content'>{foodsData.category}</div>
          <div className='btn-dashboard-foods'>
            <div>
              <button className='edit'>update</button>
            </div>
            <div>
              <button className='delete'>delete</button>
            </div>
          </div>
          {isAddFood && (
            <>
              <div className='overlay'></div>

              <div className='add-food-component'>
                <form onSubmit={handleCreateFood}>
                  <div className='close-div'>
                    <button
                      className='btn-close'
                      onClick={() => handleAddFood()}
                    >
                      close
                    </button>
                  </div>
                  <div className='add-food-inputs'>
                    Add Food
                    <label htmlFor='' className='label-input'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      className='input'
                      value={addFood.name}
                      onChange={handleChange}
                    />
                    <label htmlFor='' className='label-input'>
                      Description
                    </label>
                    <input
                      type='text'
                      name='description'
                      className='input'
                      value={addFood.description}
                      onChange={handleChange}
                    />
                    <label htmlFor='' className='label-input'>
                      Price
                    </label>
                    <input
                      type='text'
                      name='price'
                      className='input'
                      onChange={handleChange}
                      value={addFood.price}
                    />
                    <label htmlFor='' className='label-input'>
                      category
                    </label>
                    <input
                      type='text'
                      name='category'
                      className='input'
                      onChange={handleChange}
                      value={addFood.category}
                    />
                    <button onClick={() => handleUploadImage()}>
                      upload image
                    </button>
                  </div>
                  <button type='submit'>save</button>
                </form>
                {uploadImage && <UploadImg />}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Foods
