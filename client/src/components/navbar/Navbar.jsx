import { Link } from 'react-router-dom'
import './navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const Navbar = () => {
    const {user } = useContext(AuthContext)
  return (
     <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to={"/"}>
          Booking App
          </Link>
        </span>
      {user ? user.username :  ( <div className="navItems">
         <Link to={"/login"}>
          <button className="navButton">Register</button>
         </Link>
         <Link to={"/login"}>
          <button className="navButton">Login</button>
         </Link>
        </div>)}
      </div>
    </div>
  )
}
