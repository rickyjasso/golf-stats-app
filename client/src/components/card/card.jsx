import React from 'react'
import {Link} from 'react-router-dom'

const Card = (props) => {
  return (
    <Link to={props.linkTo}>
    <div className="flex-col mx-3 my-5 p-6 bg-white border rounded-xl shadow border-gray-700 h-full flex items-center">
      <h1 className="my-3 text-xl font-bold tracking-tight text-black relative">{props.body}</h1>
    </div>
  </Link>
  )
}

export default Card