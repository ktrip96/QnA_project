import React, { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Input, Button } from '@chakra-ui/react'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 30px;
  border-radius: 30px;
`
const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 1em;
`

const SignUpText = styled.p`
  font-size: 0.8em;
  color: #a0aec0;
  width: 200px;
  margin-left: auto;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
    color: #2d3748;
    transition: transform 0.2s;
    transform: scale(1.06);
  }
`

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { getLoggedIn } = useContext(AuthContext)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const registerData = {
        username,
        password,
      }
      setIsLoading(true)
      await axios.post('http://localhost:5000/auth/login', registerData)
      await getLoggedIn()
      history.push('/')
      setIsLoading(false)
    } catch (err) {
      console.error(err.response)
    }
  }

  return (
    <LoginWrapper>
      <LoginBox>
        <Title>Sign in</Title>
        <Input
          variant='outline'
          placeholder='Type your username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          mb={6}
        />
        <Input
          variant='outline'
          type='password'
          placeholder='Type your password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          mb={6}
        />
        <SignUpText onClick={() => history.push('/signup')}>
          Don't have an account? Sign up
        </SignUpText>
        {isLoading ? (
          <Button
            colorScheme='teal'
            isLoading
            onClick={handleSubmit}
            size='md'
          ></Button>
        ) : (
          <Button
            colorScheme='teal'
            isLoading={false}
            onClick={handleSubmit}
            size='md'
          >
            Sign In
          </Button>
        )}
      </LoginBox>
    </LoginWrapper>
  )
}
