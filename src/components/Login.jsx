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
        if(isError) toast.error(message)
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
                <section className="heading">
                    <h1><FaUser />Log in</h1>
                    <p>Log in bruv</p>
                </section>
                
                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <h2>Email</h2>
                            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email here" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <h2>Password</h2>
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password here" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block">Submit</button>
                        </div>
                    </form>
                </section>
            </>
    )
   )
}
export default Login