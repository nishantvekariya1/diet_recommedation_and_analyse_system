"use client"

import "./loginForm.css"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await Axios.post("http://localhost:3000/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      localStorage.setItem("email", formData.email)
      setFormData({
        email: "",
        password: "",
      })
      navigate("/home")
    } catch (error) {
      console.error("Login error:", error)
      // Handle login error (e.g., show error message to user)
    }
  }

  return (
    <div className="login-form">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign in to your account</h2>
        <div className="input-container">
          <input
            placeholder="Enter email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-label="Email"
          />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input
            placeholder="Enter password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            aria-label="Password"
          />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <button className="submit" type="submit">
          Sign in
        </button>
        <p className="signup-link">
          No account?
          <a href="/register"> Sign up</a>
        </p>
      </form>
    </div>
  )
}

