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
        <>
            <section className="heading">
                <h1><FaUser/>Register</h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-contol" id='name' name="name" value={name} placeholder="Enter your username" onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <input type="email" className="form-contol" id='email' name="email" value={email} placeholder="Enter your email" onChange={onChange} />
                    </div>
                    
                    <div className="form-group">
                        <input type="password" className="form-contol" id='password' name="password" value={password} placeholder="Enter password" onChange={onChange} />
                    </div>
                    
                    <div className="form-group">
                        <input type="password" className="form-contol" id='password2' name="password2" value={password2} placeholder="Repeat password" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="Submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
)
}
    
export default Register