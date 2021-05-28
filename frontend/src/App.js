import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './Navbar'
import axios from 'axios'

axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <div>Home</div>
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </>
  )
}

export default App
