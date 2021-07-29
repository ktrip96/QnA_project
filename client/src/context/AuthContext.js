import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// We use Context because all of React components, will need some global data
// Doing so, we avoid the prop spreading

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)
  const [usernameContext, setUsernameContext] = useState('')

  async function getLoggedIn() {
    const loggedInResponse = await axios.get(
      'http://localhost:5000/auth/isLoggedIn'
    )
    setIsLoggedIn(loggedInResponse.data)
  }

  useEffect(() => {
    getLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, getLoggedIn, usernameContext, setUsernameContext }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }
