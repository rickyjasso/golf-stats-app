import React from 'react'
import {Link} from 'react-router-dom'

const Player = () => {
  return (
    <div className='px-5 flex flex-col justify-center items-center'>
      <h1 className='text-3xl mb-10'>Welcome back!</h1>
      <Link to="/golfbag">My Golf Bag</Link>
    </div>
  )
}

export default Player