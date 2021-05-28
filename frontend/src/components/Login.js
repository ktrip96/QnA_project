import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const registerData = {
        email,
        password,
      }
      console.log(registerData)
      await axios.post('http://localhost:5000/auth/login', registerData)
    } catch (err) {
      console.error(err.response)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Type your email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
