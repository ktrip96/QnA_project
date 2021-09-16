import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import AuthContext from '../context/AuthContext'
import styled from 'styled-components'
import { Input, Button, useToast } from '@chakra-ui/react'
import Navbar from '../Navbar'

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SignUpBox = styled.div`
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

const LogInText = styled.p`
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

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()
  const { getLoggedIn, setUserData } = useContext(AuthContext)
  const toast = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const registerData = {
        email,
        password,
        username,
        passwordVerify,
      }
      setIsLoading(true)
      await axios.post('http://localhost:5000/auth/', registerData)
      await getLoggedIn()
      await axios.get('http://localhost:5000/auth').then((response) => {
        setUserData(response.data.data)
      })
      history.push('/')
      toast({
        title: 'User successfully created',
        description: `Welcome dear ${username}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      toast({
        title: 'Warning',
        description: `${err.response.data.message}`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Navbar page='login' />
      <SignUpWrapper>
        <SignUpBox>
          <Title>Sign Up</Title>

          <Input
            type='email'
            placeholder='Type your email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            mb={6}
          />
          <Input
            type='username'
            placeholder='Type your username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            mb={6}
          />
          <Input
            type='password'
            placeholder='Type your password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            mb={6}
          />
          <Input
            type='password'
            placeholder='Verify your password'
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
            mb={6}
          />
          <LogInText onClick={() => history.push('/login')}>
            Already have an account? Sign in
          </LogInText>
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
              Sign Up
            </Button>
          )}
        </SignUpBox>
      </SignUpWrapper>
    </>
  )
}
