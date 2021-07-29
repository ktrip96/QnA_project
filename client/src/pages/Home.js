import React, { useContext } from 'react'
import AddNewQuestion from '../components/AddNewQuestion'
import Question from '../components/Question'
import AuthContext from '../context/AuthContext'

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div
      style={{ backgroundColor: '#eff0f7', height: '100%', minHeight: '100vh' }}
    >
      .<div style={{ marginTop: 200 }}></div>
      <Question />
      <Question />
      {isLoggedIn === true && <AddNewQuestion />}
    </div>
  )
}
