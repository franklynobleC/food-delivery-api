import React, { useState } from 'react'
import { useFoodsContext } from '../../../context/foods_context'
import '../../../styles/admindashboard/foods.css'
import AddFoods from './AddFoods'
function Foods () {
  const [isAddFood, setIsAddFood] = useState(false)
  const { fetchFoods, foods } = useFoodsContext()
  const handleAddFood = () => {
    setIsAddFood(!isAddFood)
  }
  const createFood = e => {
    e.preventDefault()
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
                <form action='' onSubmit={createFood}>
                  <div className='close-div'>
                    <button className='btn-close' onClick={() => handleAddFood()}>close</button>
                  </div>
                  <div className='add-food-inputs'>
                    Add Food
                    <label htmlFor='' className='label-input'>
                      Name
                    </label>
                    <input type='text' name='' id='' className='input' />;
                    <label htmlFor='' className='label-input'>
                      Description
                    </label>
                    <input type='text' name='' id='' className='input' />
                    <label htmlFor='' className='label-input'>
                      Price
                    </label>
                    <input type='text' name='' id='' className='input' />
                    <label htmlFor='' className='label-input'>
                      Category
                    </label>
                    <input type='text' name='' id='' className='input' />
                    <label htmlFor='' className='label-input'>
                      Image
                    </label>
                    <input type='file' name='' id='' className='img-upload' />
                  </div>
                  <button type='submit'>save</button>
                </form>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Foods
