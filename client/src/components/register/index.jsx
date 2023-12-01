import React, { useState } from 'react'
import { onRegistration } from '../../api/auth.routes'


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
    <div className='px-5 flex flex-col justify-center'>
      <h1 className='text-3xl text-center'>Register</h1>
    <form action="submit" className='flex flex-col' onSubmit={onSubmit}>
      <label htmlFor='email' className='form-label'>
            Email address
          </label>
        <input className='border border-black my-2 px-2' type="text" name='email' placeholder='johnsmith@gmail.com' onChange={onChange} />

        <label htmlFor='password' className='form-label'>
            Password
          </label>
        <input className='border border-black my-2 px-2' type="password" name='password' placeholder='Enter password...'  onChange={onChange}/>

        <div className='text-[#FF0000]'>{error}</div>
        <div className='text-[#0000FF]'>{success}</div>

        <button type='submit' className='border border-black'>Register</button>
    </form>
</div>
  )
}

export default Register