import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Login = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {'Content-Type': "application/json"},
            })
            if (res.status===200)
                navigate('/stats');
            else {
                throw new Error(res)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

  return (
    <div className='px-5 flex justify-center'>
        <form action="submit" className='flex flex-col' onSubmit={handleSubmit}>
            <input className='border border-black my-2 px-2' type="text" name='email' placeholder='johnsmith@gmail.com' onChange={handleChange} />
            <input className='border border-black my-2 px-2' type="password" name='password' placeholder='Enter password...'  onChange={handleChange}/>
            <button type='submit' className='border border-black'>Log In</button>
        </form>
    </div>
  )
}

export default Login