
import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    
  const isAuth = false

  return (
    <>
        {isAuth ? <Outlet/> : <Navigate to='/login' />}
    </>
  )
}

export default PrivateRoutes