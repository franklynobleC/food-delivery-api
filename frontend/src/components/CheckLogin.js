import React, { useState } from 'react'

// import './index.css'
// import { useState, useEffect } from 'react'
// import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa, supabase } from '@supabase/auth-ui-shared'
import LoginClick from './LoginClick'

const CheckLogin = () => {
  const [isShow, setIsShow] = useState(false)

  const handleLogin = () => {
    setIsShow(true)
  }

  return (
    <div>
      CheckLogin
      <button type='button' onClick={handleLogin}>
        LogInto Your Account
      </button>
      {isShow ? <LoginClick /> : null}
    </div>
  )
}

export default CheckLogin
