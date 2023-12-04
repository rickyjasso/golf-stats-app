import React, { useState } from 'react'
import { onRegistration } from '../../api/auth.routes'
import { Link } from 'react-router-dom'

const Register = () => {

  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ email: '', password: '' })

    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <div className='px-5 mt-24 flex flex-col justify-center'>
      <h1 className='text-3xl text-start font-medium'>Create Account</h1>
      <h2>Already have an account? <span className='underline font-medium'><Link to="/login">Sign In</Link></span></h2>
      <p className='text-xs mt-4 mb-6 text-gray-600'>Please enter your email and password for Sign Up.</p>
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
        <div className='text-[#006F00]'>{success}</div>

        <button type='submit' className='my-12 h-10 text-white bg-black'>Register</button>
    </form>
</div>
  )
}

export default Register