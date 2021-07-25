import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AddNewQuestion from '../components/AddNewQuestion'
import Question from '../components/Question'
import AuthContext from '../context/AuthContext'

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div style={{ backgroundColor: '#eff0f7' }}>
      This is the home page
      <div style={{ marginTop: 200 }}></div>
      <Question />
      <Question />
      {isLoggedIn === true && (
        <Link to='/newQuestion'>
          <AddNewQuestion />
          Ask a question
        </Link>
      )}
    </div>
  )
}
