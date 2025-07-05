import React, { useContext, useState } from 'react'
import "../login/login.css"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {

    const [ceredentials, setCeredentials] = useState({
        username: undefined,
        email: undefined,
        country: undefined,
        city: undefined,
        phone: undefined,
        password: undefined,
    })

    const [loading, setLoading] = useState(null)
    const [error, setError] = useState("")
    // const {user, loading, error , dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e)=> {
        setCeredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }
    console.log(ceredentials);
    
    const handleClick = async(e)=> {
        e.preventDefault()
        // dispatch({type: "LOGIN_START"})
        try {
          setLoading(true)
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, ceredentials)
          // dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
          navigate("/login")
          
        } catch (err) {
          // dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
          console.log(err);
          setError(err?.response?.data?.message) 
          console.log(error);
           
          
          
        }
        setLoading(false)
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
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="phone number"
          id="phone"
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
         Create Account
        </button>
        {error && <span>{error}</span>}
      </div>
    </div>
  )
}

export default Register