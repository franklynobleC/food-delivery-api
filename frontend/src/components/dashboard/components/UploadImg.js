import React, { useState } from 'react'
import { Image, CloudinaryContext } from 'cloudinary-react'
import { useAdminContext } from '../../../context/admin_context'
import '../../../styles/admindashboard/images.css'
import '../../../styles/admindashboard/images.css'
const UploadImg = () => {
  const { getAllFoodsImages, foods_images } = useAdminContext()
  const [selectedImage, setSelectedImage] = useState([])
  const [isImage, setIsImage] = useState(false)
  const cloudName = 'deunerr66' // Replace with your actual cloud name
  const folderPath = '/Home/file-upload' // Replace with your actual folder path

  // Example image public ID within the folder
  const imagePublicId = `${folderPath}`
  const handleSelectedImage = image => {
    // e.preventDefault()
    setSelectedImage(selectedImage => [...selectedImage, image])
    console.log('Selected Image', image)
  }

  return (
    <div>
      <div className='image-container'>
        {foods_images.map((image, index) => (
          <div key={index} className='image-card'>
            <img
              src={image}
              // width={40}

              alt='add-image'
              className='image'
              onClick={() => handleSelectedImage(image)}
            />

          </div>
        ))}
        {/* return (<div key={index} className='image-card'></div>) */}
      </div>
    </div>
  )
}

export default UploadImg
