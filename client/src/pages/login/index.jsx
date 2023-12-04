import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'
import { onLogin } from '../../api/auth.routes'
import { Link } from 'react-router-dom'

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
      <div className='mt-24 mb-2 font-medium'>
        <h1 className='text-xl'>Welcome to Golf Stats,</h1>
        <h2>Sign in to continue</h2>
      </div>
      <div className='mb-6'>
        <h3 className='text-sm'>Don't have an account? <span className='font-medium underline'><Link to="/register" >Register for free</Link></span></h3>
      </div>
        <form action="submit" className='flex flex-col' onSubmit={onSubmit}>
          <div>
            <label htmlFor='email' className='text-xs'>Email</label>
            <input className='border border-black my-2 px-2 w-full h-10' type="text" name='email' placeholder='johnsmith@gmail.com' onChange={onChange} />
          </div>
          <div>
            <label htmlFor='password' className='text-xs'>Password</label>
            <input className='border border-black my-2 px-2 w-full h-10' type="password" name='password' placeholder='Enter password...'  onChange={onChange}/>
          </div>
            <div className='text-[#FF0000]'>{error}</div>

            <button type='submit' className='my-12 h-10 text-white bg-black'>Sign In</button>
        </form>
    </div>
  )
}

export default Login