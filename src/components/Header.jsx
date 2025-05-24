import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

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
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Main game</Link>
            </div>
            <ul>
                <li>
                    <div><Link to='/leaderboard'>Leaderboard</Link></div>
                </li>
                {user ? (
                    <>
                     <li>
                        <button className='btn' onClick={logoutFn}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                    <li>
                        <div><Link to='/dashboard' >{user.name}</Link></div>
                    </li>
                    <li>
                        <div><Link to='/multiplayer' >Play vs Player</Link></div>
                    </li>
                    </>
                ) : (
                <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt />Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser />Register
                    </Link>
                </li>
                </>
            )}
            </ul>
        </header>
    )
}
export default Header