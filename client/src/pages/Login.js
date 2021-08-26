import React, { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Input, Button, useToast } from '@chakra-ui/react'
import Navbar from '../Navbar'

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

  const { getLoggedIn, setUserData } = useContext(AuthContext)
  const history = useHistory()
  const toast = useToast()

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
      await axios
        .get('http://localhost:5000/auth')
        .then((response) => {
          setUserData(response.data.data)
        })
        .catch((error) => console.log(error))
      history.push('/')

      toast({
        title: 'Logged In Successfully',
        description: `Welcome dear ${username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      toast({
        title: 'Error',
        description: `${err.response.data.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Navbar page='login' />
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
    </>
  )
}
