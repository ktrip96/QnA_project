import React, { useState } from 'react'
import axios from 'axios'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      }
      console.log(registerData)
      await axios.post('http://localhost:5000/auth/', registerData)
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
