import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import AuthContext from '../context/AuthContext'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')

  const history = useHistory()
  const { getLoggedIn } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const registerData = {
        email,
        password,
        username,
        passwordVerify,
      }
      console.log(registerData)
      await axios.post('http://localhost:5000/auth/', registerData)
      await getLoggedIn()
      history.push('/')
    } catch (err) {
      console.error(err.response)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Type your email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
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
        <input
          type='password'
          placeholder='Verify your password'
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <button>Sign up</button>
      </form>
    </div>
  )
}
