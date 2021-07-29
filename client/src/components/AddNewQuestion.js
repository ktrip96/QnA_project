import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { Button } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

export default function AddNewQuestion() {
  const history = useHistory()
  return (
    <div>
      <Button
        leftIcon={<FaPlusCircle />}
        colorScheme='yellow'
        color='white'
        variant='solid'
        onClick={() => history.push('/newQuestion')}
      >
        Add new question
      </Button>
    </div>
  )
}
