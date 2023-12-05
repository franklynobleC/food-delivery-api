import React, { useState } from 'react'
import '../styles/about.css'

const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleDataEdit = e => {
    e.preventDefault()

    console.log('User Data Edited')
  }
  return (
    <main className='about-parent'>
      about page
      <section className='page section section-center'>
        <article>
          <div className='title'>
            <h2>Our Story</h2>
            <div className='underline'></div>

            <button type='submit' onClick={handleOpen}>
              change Address
            </button>
          </div>
          {isOpen && (
            <form onSubmit={handleDataEdit}>
              <div> </div>
              name:
              <input type='text' name='' id='' />
              address:
              <input type='text' />
              phone:
              <input type='text' />
              <button type='submit'>Submit</button>
            </form>
          )}
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
            quasi neque optio possimus exercitationem. Aliquid quaerat harum
            tempora suscipit? Quo eum cum laborum architecto itaque facilis iste
            praesentium reprehenderit ullam! Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Animi quasi neque optio possimus
            exercitationem. Aliquid quaerat harum empora suscipit? Quo eum cum
            laborum architecto itaque facilis iste praesentium reprehenderit
            ullam! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Velit cum reiciendis alias veritatis ad autem quam tempore odio
            distinctio voluptatibus rem soluta illo possimus quos a, aperiam
            accusamus obcaecati neque. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Repudiandae corrupti quisquam consequuntur
            pariatur unde eaque. Eligendi autem, aliquam necessitatibus eveniet
            consectetur inventore sunt amet quod, soluta reprehenderit, quas
            labore voluptas?
          </p>
        </article>
      </section>
    </main>
  )
}

export default AboutPage
