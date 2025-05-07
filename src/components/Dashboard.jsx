import { useSelector,useDispatch } from "react-redux"
import { getCurrentUser, uploadProfilePicture } from "../features/auth/authSlice"
import { useState } from "react"

const Dashboard = () =>
{
    const [file,setFile] = useState(null)
    const dispatch = useDispatch()
    const {user, isLoading} = useSelector((state) => state.auth)

    const handleUpload = () =>
    {
        if(!file) return
        dispatch(uploadProfilePicture(file)).unwrap().then(() => {dispatch(getCurrentUser())}).catch((err) => {console.error('upload failed', err)})
    }

    return (
        <>   
        <div>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Profile Picture'}
            </button>

        {user?.profilePicture && (
            <img src={`${user?.profilePicture}?${Date.now()}`} alt="Profile" />
        )}
    </div> 
    <ul>
        <li>
            {user.profilePicture}
        </li>
        <li>
            {user.name}
        </li>
        <li>
            {user.email}
        </li>
        <div>PVP stats:</div>
        <li>
            Elo: {user.elo}
        </li>
        <li>
            Games played: {user.gamesPlayed}
        </li>
        <li>
            Games won: {user.gamesWon}
        </li>
    </ul>
        </>
    )
}
export default Dashboard