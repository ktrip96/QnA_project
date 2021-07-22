import React, { useState } from 'react'

export default function AskQuestion() {
  const [email, setEmail] = useState('')

  return (
    <div>
      <h1> Ask a Question Page</h1>
      <input
        type='email'
        placeholder='Type your email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </div>
  )
}
