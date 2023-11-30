
import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const RestrictedRoutes = () => {
  const isAuth = false

  return (
    <>
        {!isAuth ? <Outlet/> : <Navigate to='/stats' />}
    </>
  )
}

export default RestrictedRoutes