import React, { useEffect, useState } from 'react'
import { useFoodsContext } from '../../../context/foods_context'
import { useAdminContext } from '../../../context/admin_context'
import '../../../styles/admindashboard/foods.css'
import AddFoods from './AddFoods'
import UploadImg from './UploadImg'
import UpdateFood from './updateFood'
import updateFood from './updateFood'
import { Link } from 'react-router-dom'
function Foods () {
  const [isAddFood, setIsAddFood] = useState(false)
  const [addFood, setAddFood] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  })

  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedImage, setSelectedImage] = useState([])
  const [imageString, setImageString] = useState([])
  const [updateId, setUpdateID] = useState(null)

  const [uploadImage, setUploadImage] = useState(true)
  const { fetchFoods, foods, fetchSingleFood, single_food, is_data_fetched } =
    useFoodsContext()
  const { foods_images, createFoods, deleteFood } = useAdminContext()

  const handleUpdateFood = async id => {
    console.log('handle From Foods', id)
    console.log('handle update food called', updateId)

    if (!id) {
      return
    }

    try {
      console.log(id)
      await fetchSingleFood(id)
      setUpdateID(single_food._id)
      setIsUpdate(!isUpdate)
    } catch (error) {
      console.log('error')
    }
  }
  const handleDeleteFood = async id => {
    console.log('handle delete food called', id)
    if (!id) {
      return
    }
    try {
      await deleteFood(id)
    } catch (err) {
      console.log('error  from component err')
    }
  }

  const handleSelectedImage = image => {
    // e.preventDefault()
    setImageString(image)
    setSelectedImage(selectedImage => [...selectedImage, image])
    console.log('Selected Image', image)
  }

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
    console.log('All Foods Data', addFood)
  }
  const handleCreateFood = e => {
    //TODO:  pass    the   method  to  create  new Food item
    e.preventDefault()
    console.log('handle add food called', addFood)
    console.log('single Image String', imageString)
    createFoods(
      addFood.name,
      addFood.description,
      addFood.price,
      imageString,
      addFood.category
    )
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
        <button
          className='btn-add-food'
          type='button'
          onClick={() => handleAddFood()}
        >
          Add food
        </button>
      </div>
      <div className='foods-table-header'>
        <div>Name</div>
        <div>Description</div>
        <div>Category</div>
      </div>
      {foods.map((foodsData, index) => {
        const { _id } = foodsData

        return (
          <div key={index} className='foods-data-header'>
            <div className='content'>{foodsData.name}</div>
            <div className='content'>{foodsData.description}</div>
            <div className='content'>{foodsData.category}</div>

            <div className='btn-dashboard-foods'>
              <div>
                <button
                  className='edit'
                  // type='button'
                  onClick={() => handleUpdateFood(_id)}
                >
                  <Link
                    to={`/dashboard/foods/${foodsData._id}`}
                    className='edit'
                  >
                    Edit
                  </Link>
                </button>
              </div>
              <div>
                <button
                  className='delete'
                  type='button'
                  onClick={() => handleDeleteFood(foodsData._id)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        )
      })}

      {isUpdate && <UpdateFood />}

      {isAddFood && (
        <>
          <div className='overlay'></div>

          <div className='add-food-component'>
            <form onSubmit={handleCreateFood} className='food-form'>
              <div className='close-div'>
                <button className='btn-close' onClick={() => handleAddFood()}>
                  close
                </button>
              </div>
              <div className='add-food-inputs'>
                Add Food
                <div className='input-group'>
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
                </div>
                <div className='input-group'>
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
                    value={addFood.price}
                  />
                </div>
                <div className='input-group'>
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
                </div>
                <button
                  type='button'
                  onClick={() => handleUploadImage()}
                  className='btn-upload'
                >
                  upload image
                </button>
              </div>
              <button type='submit' className='btn-save'>
                save
              </button>
            </form>

            {uploadImage && (
              <div className='image-container'>
                {foods_images.map((image, index) => (
                  <div key={index} className='image-card'>
                    <img
                      src={image}
                      // width={40}

                      className='image'
                      onClick={() => handleSelectedImage(image)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Foods
