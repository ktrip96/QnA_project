import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// We use Context because all of React components, will need some global data
// Doing so, we avoid the prop spreading

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)
  const [userData, setUserData] = useState({})

  async function getLoggedIn() {
    const loggedInResponse = await axios.get(
      'http://localhost:5000/auth/isLoggedIn'
    )
    setIsLoggedIn(loggedInResponse.data)
  }

  async function getUserData() {
    const userDataResponse = await axios.get('http://localhost:5000/auth')
    setUserData(userDataResponse.data.data)
  }

  useEffect(() => {
    getLoggedIn()
    if (isLoggedIn) getUserData()
  }, [isLoggedIn])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, getLoggedIn, userData, setUserData }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }
