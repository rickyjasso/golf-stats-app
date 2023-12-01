
import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return (
    <>
        {!isAuth ? <Outlet/> : <Navigate to='/stats' />}
    </>
  )
}

export default RestrictedRoutes