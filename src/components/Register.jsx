import React from "react"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import { useEffect } from "react"
import Spinner from "./Spinner"

const Register = () =>
{   
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user,isLoading, isError, isSuccess, message} = useSelector(state => state.auth)
    useEffect(() =>
    {
        if(isError) toast.error(message)
        if(isSuccess || user) navigate('/')
        dispatch(reset)
    },[user, isError, isSuccess, message, navigate, dispatch])

    const [formData, setFormData] = useState({name: '', email:'', password: '', password2: ''})
    const {name, email, password, password2} = formData

    const onChange = e => {
        setFormData(prevState =>
        ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = e =>
    {
        e.preventDefault()
        if(password !== password2)
        {
            toast.error('Passwords are different')
        }
        else
        {
            const userData = {name, email, password}
            dispatch(register(userData))
        }
    }

return (
        isLoading ? <Spinner /> : (
             <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md bg-surface shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-text">
          Create a New Account
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-text-alt">
            Username
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={onChange}
            className="
              mt-1 w-full px-4 py-2
              bg-bg border border-border rounded-md
              text-text placeholder:text-text-alt
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-text-alt">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={onChange}
            placeholder="you@example.com"
            className="
              mt-1 w-full px-4 py-2
              bg-bg border border-border rounded-md
              text-text placeholder:text-text-alt
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-text-alt">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={onChange}
            type="password"
            placeholder="••••••••"
            className="
              mt-1 w-full px-4 py-2
              bg-bg border border-border rounded-md
              text-text placeholder:text-text-alt
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />
        </div>
<div className="mb-6">
          <label htmlFor="password2" className="block text-sm font-medium text-text-alt">
            Password
          </label>
          <input
            id="password2"
            value={password2}
            onChange={onChange}
            type="password"
            placeholder="••••••••"
            className="
              mt-1 w-full px-4 py-2
              bg-bg border border-border rounded-md
              text-text placeholder:text-text-alt
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />
        </div>
        <button className="
          w-full bg-primary text-surface
          py-2 px-4 rounded-md
          hover:bg-primary-variant
          transition
        "
        type="submit">
          Register
        </button>
      </div>
    </div>
    )
)
}
    
export default Register