import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Stats from './pages/stats'
import Navbar from './components/navbar'
import Home from './pages/home'
import RestrictedRoutes from './private/restrictedRoutes'
import PrivateRoutes from './private/privateRoutes'
import Player from './pages/player'
import GolfBag from './pages/golfbag'
import GolfRound from './pages/golfround'
import RoundHistory from './pages/roundhistory'


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route element={<PrivateRoutes/>}>
          <Route path='/player' element={<Player/>}/>
          <Route path='/stats' element={<Stats/>}/>
          <Route path='/golfbag' element={<GolfBag/>}/>
          <Route path='/golfround' element={<GolfRound/>}/>
          <Route path='/roundhistory' element={<RoundHistory/>}/>
        </Route>

        <Route element={<RestrictedRoutes/>}>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
