import { onLogout } from '../api/auth.routes';
import { unauthenticateUser } from '../redux/slices/authSlice';


export const handleLogout = async (dispatch) => {
    
    try {
        await onLogout()
        dispatch(unauthenticateUser())
        localStorage.removeItem('isAuth')
  } catch (error) {
    console.log(error)
  }
}
