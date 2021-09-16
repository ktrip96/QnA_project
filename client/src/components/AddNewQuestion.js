import React, { useContext } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { Button, IconButton } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useToast } from '@chakra-ui/react'
import styled from 'styled-components'

const LargeButton = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

const SmallButton = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`

export default function AddNewQuestion() {
  const history = useHistory()
  const { isLoggedIn } = useContext(AuthContext)
  const toast = useToast()

  function handleClick() {
    if (isLoggedIn) {
      history.push('/newQuestion')
    } else {
      toast({
        title: 'Warning!',
        description: `You need to be logged in to ask a question`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (
    <>
      <LargeButton>
        <Button
          rightIcon={<FaPlusCircle />}
          colorScheme='yellow'
          color='white'
          variant='solid'
          onClick={handleClick}
        >
          Add Question
        </Button>
      </LargeButton>
      <SmallButton>
        <IconButton
          variant='solid'
          colorScheme='yellow'
          aria-label='Add new Question'
          fontSize='20px'
          color='white'
          icon={<FaPlusCircle />}
        />
      </SmallButton>
    </>
  )
}
