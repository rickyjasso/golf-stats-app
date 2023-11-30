import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const isAuth = false

  return (
    <nav className='flex justify-between px-5 py-5'>
        <div>
            <Link to="/">GOLF STATS</Link>
        </div>

        {isAuth ? (
          <div className='flex gap-5'>
            <Link to="/stats">Stats</Link>
            <Link to="/logout">Logout</Link>
          </div>
        ) : (
          <div className='flex gap-5'>
              <Link to="/login">Login</Link>
              <Link to="/login">Register</Link>
          </div>
        )}

    </nav>
  )
}

export default Navbar