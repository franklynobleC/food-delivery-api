import React from 'react'
import { useFoodsContext } from '../../../context/foods_context'
import '../../../styles/admindashboard/foods.css'

function Foods () {
  const { fetchFoods, foods } = useFoodsContext()

  if (!foods) {
    return <div>Foods Data Not Found</div>
  }
  return (
    <div className='foods-data-parent-div'>
      <div className='add-food-btn-container'>
        <button className='btn-add-food'>Add food</button>
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
        </div>
      ))}
    </div>
  )
}

export default Foods
