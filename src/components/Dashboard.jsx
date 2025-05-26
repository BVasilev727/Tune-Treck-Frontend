import { useSelector,useDispatch } from "react-redux"
import { getCurrentUser, uploadProfilePicture } from "../features/auth/authSlice"
import { useState } from "react"
import { FaCamera } from 'react-icons/fa'

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
         <div className="bg-bg text-text min-h-screen">
        <main className="pt- pb-12 px-4 flex justify-center">
        <div className="relative w-full max-w-sm mt-8">
            <div className="bg-surface border border-border rounded-lg pt-20 pb-8 px-6 text-center mx-auto top-6 justify-center">
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-12" >
            <img src={
            user?.profilePicture ?
            `${user.profilePicture}?${Date.now()}` : '.frontend\public\base-profile-picture.png'
        } alt="Profile" className="
                w-24 h-24 rounded-full border-4 border-surface shadow-lg object-cover"/>
            </div>

         <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="mt-1 text-text-alt">{user?.email}</p>

        <div className="mt-12 bg-surface border border-border rounded-lg pt-16 pb-8 px-6">
            <div className="text-center mb-6">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
             <label htmlFor="profile-upload">
            <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Profile Picture'}
            </button>
            </label>
            </div>
        </div>
            <div className="
                absolute inset-0 flex items-center justify-center
                rounded-full bg-black bg-opacity-50
                opacity-0 group-hover:opacity-100
                transition-opacity ">
              {isLoading
                ? <div className="text-white">…</div>
                : <FaCamera className="text-white text-2xl" />
              }
            </div>
           
            <div className="mt-6 space-y-4">
              <div>
                <span className="block text-text-alt">Elo Rating</span>
                <span className="block text-xl font-bold">{user?.elo}</span>
              </div>
              <div>
                <span className="block text-text-alt">Games Played</span>
                <span className="block text-xl font-bold">{user?.gamesPlayed}</span>
              </div>
              <div>
                <span className="block text-text-alt">Games Won</span>
                <span className="block text-xl font-bold">{user?.gamesWon}</span>
              </div>
            </div>
    </div> 
       </div>
        </main>
        </div>
    )
}
export default Dashboard