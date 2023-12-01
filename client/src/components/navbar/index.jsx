import {Link} from 'react-router-dom'
import { handleLogout } from '../../api/auth.controllers'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <nav className='flex justify-between px-5 py-5'>
        <div>
            <Link to="/">GOLF STATS</Link>
        </div>

        {isAuth ? (
          <div className='flex gap-5'>
            <Link to="/stats">Stats</Link>
            <Link to="/" onClick={() => handleLogout(dispatch)}>Logout</Link>
          </div>
        ) : (
          <div className='flex gap-5'>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
          </div>
        )}

    </nav>
  )
}

export default Navbar