import React from 'react'
import '../styles/contact.css'

const Contact = () => {
  return (
    <section className='contact-us'>
      <div className='section-center'>
        <h3> Join Our NewsLetter and get 20% off </h3>

        <div className='content'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
            voluptatibus suscipit esse, nam quia aliquam voluptatum quo,
            repudiandae debitis architecto ex. Minus voluptatem earum nam. Sunt
            nesciunt dolorem corporis voluptates!
          </p>
          <form
            className='contact-form'
            action='https://formspree.io/f/mwkdllrp'
            method='POST'
          >
            <input
              type='email'
              placeholder='enter email'
              className='form-input'
              name='email'
            />

            <button type='submit' className='submit-btn'>
              subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
