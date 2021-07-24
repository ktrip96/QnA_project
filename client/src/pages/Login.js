import React, { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { getLoggedIn } = useContext(AuthContext)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const registerData = {
        username,
        password,
      }
      await axios.post('http://localhost:5000/auth/login', registerData)
      await getLoggedIn()
      history.push('/')
    } catch (err) {
      console.error(err.response)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='username'
          placeholder='Type your username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          placeholder='Type your password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Login</button>
      </form>
    </div>
  )
}