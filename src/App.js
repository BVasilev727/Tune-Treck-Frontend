import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import GameComponent from './components/GameComponent'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser } from './features/auth/authSlice'
import MultiplayerGame from './components/MultiplayerGame'
import Matchmaking from './components/Matchmaking'
import Leaderboard from './components/Leaderboard'
import Spinner from './components/Spinner'


function App()
{
  const dispatch = useDispatch();

  useEffect(() =>
  {
    dispatch(getCurrentUser())
  },[dispatch])

  const {checkedAuth} = useSelector(state => state.auth)
  if(!checkedAuth)
  {
    return <div><Spinner/></div>
  }
  return (
    <>
    <Router>
    <div className='w-full'>
      <Header />
      <Routes>
        <Route path='/' element={<GameComponent />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/multiplayer' element={<Matchmaking />} />
          <Route path='/multiplayer/:roomId' element={<MultiplayerGame />} />  
      </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App