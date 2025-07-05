import React, { useContext, useState } from 'react'
import "./login.css"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {

    const [ceredentials, setCeredentials] = useState({
        username: undefined,
        password: undefined
    })

    const {user, loading, error , dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e)=> {
        setCeredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }
    const handleClick = async(e)=> {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, ceredentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            navigate("/")

        } catch (error) {
            dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
            
            
        }
    }
    

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login