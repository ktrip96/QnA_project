import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Navbar from './Navbar'
import axios from 'axios'
import MyAccount from './components/MyAccount'
import AuthContext from './context/AuthContext'
import AskQuestion from './components/AskQuestion'
import Home from './components/Home'

axios.defaults.withCredentials = true

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        {isLoggedIn === false && (
          <>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </>
        )}
        {isLoggedIn === true && (
          <>
            <Route path='/myaccount'>
              <MyAccount />
            </Route>
            <Route path='/logout'>
              <Logout />
            </Route>
            <Route path='/newQuestion'>
              <AskQuestion />
            </Route>
          </>
        )}
      </Switch>
    </>
  )
}

export default App
