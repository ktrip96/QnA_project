import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import axios from 'axios'
import MyAccount from './pages/MyAccount'
import AuthContext from './context/AuthContext'
import AskQuestion from './pages/AskQuestion'
import Home from './pages/Home'
import './App.css'
import Stats from './pages/Stats'

axios.defaults.withCredentials = true

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/stats'>
          <Stats />
        </Route>
        {isLoggedIn === false && (
          <>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/newQuestion'>
              <Home />
            </Route>
          </>
        )}
        {isLoggedIn === true && (
          <>
            <Route path='/myaccount'>
              <MyAccount />
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
