import React, { useEffect, useState } from 'react'
import '../../../styles/admindashboard/foods.css'
import { useFoodsContext } from '../../../context/foods_context'
import { useAdminContext } from '../../../context/admin_context'
import { useParams } from 'react-router-dom'

function EditFood () {
  // console.log(Id)
  const [uploadImage, setUploadImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const { id } = useParams()

  console.log(id)
  const { foods } = useFoodsContext()
  const { foods_images, updateFood } = useAdminContext()
  const [editFood, setEditFood] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  })

  const handleUploadImage = () => {
    setUploadImage(!uploadImage)
  }
  const handleSelectedImage = image => {
    // e.preventDefault()
    setSelectedImage(image)
    console.log('Selected Image from Edit', image)
  }

  const [isAddFood, setIsAddFood] = useState(true)
  const handleChange = e => {
    // e.preventDefault()
    setEditFood({
      ...editFood,
      [e.target.name]: e.target.value
    })
    console.log('All Foods Data', editFood, 'Selected Image', selectedImage)
  }

  //TODO:  send Handle to backend update  food Data
  const handleUpdateFood = () => {
    console.log(editFood)
    if (selectedImage && id) {
      console.log(id)
      console.log(selectedImage)
      editFood.image_url = selectedImage
      console.log('Edit Food Data 1', editFood)
      setEditFood({
        ...editFood,
        image_url: selectedImage
      })
      updateFood(
        editFood.name,
        editFood.description,
        editFood.price,
        editFood.image_url,
        id
      )
    }

    if (id) {
      updateFood(
        editFood.name,
        editFood.description,
        editFood.price,
        editFood.image_url,
        id
      )
      // setEditFood({
      //   name: '',
      //   description: '',
      //   price: '',
      //   category: '',
      //   image_url: ''
      // })
    }
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
        <form onSubmit={handleUpdateFood} className='food-form'>
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
            <div className='image-card'>
              <img
                src={selectedImage || editFood.image_url}
                className='image'
                // height={100}
                width={100}
                alt='image_data'
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
            update
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
    )
  } else {
    ;<></>
  }
}

export default EditFood
