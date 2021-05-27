import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <div>Home</div>
        </Route>
        <Route path='/signup'>
          <div>Sign up</div>
        </Route>
        <Route path='/login'>
          <div>Login</div>
        </Route>
      </Switch>
    </>
  )
}

export default App
