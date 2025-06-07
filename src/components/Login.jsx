import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {login, reset} from "../features/auth/authSlice"
import Spinner from "./Spinner";

const Login = () =>
{
   const [formData, setFormData] = useState({email: '', password: ''})
   const {email, password} = formData

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

   useEffect(
    () => {
        if(isSuccess || user) navigate('/')
        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch]
   )

   const onChange = e =>{
    setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
   }
   const onSubmit = e =>{
    e.preventDefault()
    const userData = {email, password}
    dispatch(login(userData))
   }
   return(
    isLoading ? <Spinner /> :(
    <>
     <div className="flex justify-center bg-bg p-4 pt-16">
     <div className="w-full max-w-md bg-surface shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-text">Login to Your Account</h2>
            <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-text-alt">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            onChange={onchange}
            value={email}
            className="
              mt-1 w-full px-4 py-2
              bg-bg border border-border rounded-md
              text-text placeholder:text-text-alt
              focus:outline-none focus:ring-2 focus:ring-primary
              transition"/>
        </div>
            <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-text-alt">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            onchange={onChange}
            value={password}
            className="
              mt-1 w-full px-4 py-2
              bg-bg border border-border rounded-md
              text-text placeholder:text-text-alt
              focus:outline-none focus:ring-2 focus:ring-primary
              transition"/>
        </div>
        <button type="submit" className="
          w-full bg-primary text-surface
          py-2 px-4 rounded-md
          hover:bg-primary-variant
          transition">
          Login
        </button>
        </div>

    </div>
            </>
    )
   )
}
export default Login