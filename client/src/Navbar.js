import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from './components/Logout'
import AuthContext from './context/AuthContext'

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Link to='/'>Home</Link>
      {isLoggedIn === false && (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </>
      )}
      {isLoggedIn === true && (
        <>
          <Link to='/myaccount'>My Account</Link>
          <Logout />
        </>
      )}
    </>
  )
}
