import React from 'react'
import Card from '../../components/card/card'
import {Link} from 'react-router-dom'

const Player = () => {
  return (
    <div className='px-5 my-12 flex flex-col justify-center items-center'>
      <h1 className='text-3xl mb-10'>Welcome back!</h1>
      <Card linkTo='/golfbag' body='My Golf Bag' />
      <Card linkTo='/roundhistory' body='View Rounds' />
      <Card linkTo='/golfround' body='New Round' />
    </div>
  )
}

export default Player