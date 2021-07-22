import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div>
      This is the home page
      {isLoggedIn === true && <Link to='/newQuestion'>Ask a question</Link>}
    </div>
  )
}
