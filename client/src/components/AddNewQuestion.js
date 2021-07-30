import React, { useContext } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { Button } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useToast } from '@chakra-ui/react'

export default function AddNewQuestion() {
  const history = useHistory()
  const { isLoggedIn } = useContext(AuthContext)
  const toast = useToast()

  function handleClick() {
    if (isLoggedIn) history.push('/newQuestion')
    else {
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
    <div>
      <Button
        leftIcon={<FaPlusCircle />}
        colorScheme='yellow'
        color='white'
        variant='solid'
        onClick={handleClick}
      >
        Add new question
      </Button>
    </div>
  )
}
