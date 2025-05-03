import axios from 'axios'

const API_URL =  process.env.REACT_APP_API_URL + '/users'
const register = async (userData) =>
{
    const response = await axios.post(API_URL,userData, {
        withCredentials: true
    })
    return response.data
}

const logout = async() =>
{
    const response = await fetch(API_URL+'/logout',
        {
            method:'POST',
            credentials: 'include'
        }
    )
    if(!response.ok) throw new Error('logout failed')
}

const login = async(userData) =>
{
    const response = await axios.post(API_URL + '/login', userData,
        {
            withCredentials: true
        }
    )
    return response.data
}

const uploadProfilePicture = async (imageFile, token) =>
{
    const formData = new FormData()
    formData.append('image', imageFile)

    const res = await axios.post(API_URL + '/upload', formData, {
        withCredentials: true,
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })

    return res.data
}

const getCurrentUser = async () =>
{
    const response = await axios.get(`${API_URL}/current`, {
        withCredentials: true
    })
    return response.data
}

const authService = {register, logout, login, uploadProfilePicture, getCurrentUser}
export default authService