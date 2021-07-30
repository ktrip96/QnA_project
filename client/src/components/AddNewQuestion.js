import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { Button } from '@chakra-ui/react'

export default function AddNewQuestion() {
  return (
    <div>
      <FaPlusCircle color='yellow' />
      <Button
        leftIcon={<FaPlusCircle />}
        colorScheme='yellow'
        color='white'
        variant='solid'
      >
        Add new question
      </Button>
    </div>
  )
}
