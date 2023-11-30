import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Stats from './components/stats'
import Navbar from './components/navbar'
import Home from './components/home'
import RestrictedRoutes from './private/restrictedRoutes'
import PrivateRoutes from './private/privateRoutes'



function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route element={<PrivateRoutes/>}>
          <Route path='/stats' element={<Stats/>}/>
        </Route>

        <Route element={<RestrictedRoutes/>}>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
