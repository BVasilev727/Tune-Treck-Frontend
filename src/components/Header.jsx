import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import ThemeToggle from './ThemeToggle'

const Header = () =>
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    const logoutFn = () =>
    {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return(
        <header className='relative py-6'>
            <div className='flex justify-center px-4'>
            <nav
            className='flex items-center space-x-6
            bg-surface/80 backdrop-blur-md
            border border-border rounded-full
            px-6 py-3'>
                <Link to='/' className='text-x1 font-bold text-text'>TuneTreck</Link>
             <Link to='/leaderboard' className='hover:text-text transition'>Leaderboard</Link>
                {user ? (
                    <>
                        
                        <div><Link to='/multiplayer' className='text-text-alt hover:text-text transition'>Play vs Player</Link></div>
                  <button className=' flex items-center space-x-1
                  bg-primary text-surface
                  px-3 py-1 rounded-full
                  hover:bg-primary-variant
                  transition' onClick={logoutFn}>
                            <FaSignOutAlt /> Logout
                        </button>
                        <div><Link to='/dashboard' className='text-text-alt hover:text-text transition'>{user.name}</Link></div>
                    
                    </>
                ) : (
                <>
                
                    <Link to='/login'  className="flex items-center space-x-1 text-text-alt hover:text-text transition">
                        <FaSignInAlt />Login
                    </Link>
                
                    <Link to='/register' className="flex items-center space-x-1 text-text-alt hover:text-text transition">
                        <FaUser />Register
                    </Link>
                </>
            )}
            
            <ThemeToggle />
            </nav>
            </div>
        </header>
    )
}
export default Header