import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'
import { onLogin } from '../../api/auth.routes'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
      })
      const [error, setError] = useState(false)
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
      }
    
      const dispatch = useDispatch()
      const onSubmit = async (e) => {
        e.preventDefault()
    
        try {
          await onLogin(values)
          dispatch(authenticateUser())
    
          localStorage.setItem('isAuth', 'true')
        } catch (error) {
          console.log(error.response.data.errors[0].msg)
          setError(error.response.data.errors[0].msg)
        }
      }

  return (
    <div className='px-5 flex flex-col justify-center'>
      <h1 className='text-3xl text-center'>Login</h1>
        <form action="submit" className='flex flex-col' onSubmit={onSubmit}>
            <h1>Login</h1>
            <input className='border border-black my-2 px-2' type="text" name='email' placeholder='johnsmith@gmail.com' onChange={onChange} />
            <input className='border border-black my-2 px-2' type="password" name='password' placeholder='Enter password...'  onChange={onChange}/>

            <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

            <button type='submit' className='border border-black'>Log In</button>
        </form>
    </div>
  )
}

export default Login