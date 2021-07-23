import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router'

export default function Logout() {
  const { getLoggedIn } = useContext(AuthContext)
  const history = useHistory()
  // When the user presses Logout:
  // => I remove the token from the cookies (I can't do it with JS because cookies are HTTP only, so I post to the following URL)
  // => I need to update my context state from LoggedIn === true to false.
  // => I need to redirect him to the home page

  async function logOut() {
    await axios.post('http://localhost:5000/auth/logout')
    await getLoggedIn()
    history.push('/')
  }

  return <button onClick={logOut}>Log Out</button>
}
