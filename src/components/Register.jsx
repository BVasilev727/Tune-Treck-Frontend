// src/components/Register.jsx
import React, { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "./Spinner"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  // Password requirements state
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  })

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const { name, email, password, password2 } = formData

  useEffect(() => {
    if (isError) toast.error(message)
    if (isSuccess || user) {
      navigate("/")
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  // Validate password against requirements
  const validatePassword = (pw) => {
    setRequirements({
      length: pw.length >= 8,
      uppercase: /[A-Z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "password") {
      validatePassword(value)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("Passwords do not match")
      return
    }
    // Ensure all requirements are met
    if (!Object.values(requirements).every(Boolean)) {
      toast.error("Password does not meet all requirements")
      return
    }
    dispatch(register({ name, email, password }))
  }

  if (isLoading) return <Spinner />

  return (
    <div className="flex justify-center bg-bg p-4 pt-16">
      <div className="w-full max-w-md bg-surface shadow-xl rounded-2xl p-6">
        <form onSubmit={onSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center text-text">
            Create a New Account
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-alt"
            >
              Username
            </label>
            <input
              id="name"
              name="name"
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-alt"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-alt"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              className="
                mt-1 w-full px-4 py-2
                bg-bg border border-border rounded-md
                text-text placeholder:text-text-alt
                focus:outline-none focus:ring-2 focus:ring-primary
                transition
              "
            />

            {/* Password requirements checklist */}
            <ul className="mt-2 space-y-1 text-sm">
              <li
                className={
                  requirements.length
                    ? "text-green-600"
                    : "text-[var(--color-text-alt)]"
                }
              >
                {requirements.length ? "✓" : "•"} At least 8 characters
              </li>
              <li
                className={
                  requirements.uppercase
                    ? "text-green-600"
                    : "text-[var(--color-text-alt)]"
                }
              >
                {requirements.uppercase ? "✓" : "•"} One uppercase letter
              </li>
              <li
                className={
                  requirements.number
                    ? "text-green-600"
                    : "text-[var(--color-text-alt)]"
                }
              >
                {requirements.number ? "✓" : "•"} One number
              </li>
              <li
                className={
                  requirements.special
                    ? "text-green-600"
                    : "text-[var(--color-text-alt)]"
                }
              >
                {requirements.special ? "✓" : "•"} One special character
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-text-alt"
            >
              Confirm Password
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              value={password2}
              onChange={onChange}
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

          <button
            type="submit"
            className="
              w-full bg-primary text-surface
              py-2 px-4 rounded-md
              hover:bg-primary-variant
              transition
            "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
