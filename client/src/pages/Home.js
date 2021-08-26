import React, { useEffect, useState } from 'react'
import Question from '../components/Question'
import styled from 'styled-components'
import { Text, InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { CgSearch } from 'react-icons/cg'
import Navbar from '../Navbar'

const HomeWrapper = styled.div`
  width: 100%;
  background-color: #eff0f7;
  height: 100%;
  min-height: 100vh;
`

const QuestionsWrapper = styled.div`
  margin: auto;
  width: 50%;
  height: 100%;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export default function Home() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/question', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setQuestions(data.data))
  }, [])

  return (
    <>
      <Navbar page='' />
      <HomeWrapper>
        .
        <QuestionsWrapper>
          <Text fontWeight='bold' fontSize='3xl' textAlign='center' mt={75}>
            Discover
          </Text>
          <InputGroup backgroundColor='white'>
            <InputLeftElement
              pointerEvents='none'
              children={<CgSearch color='gray.300' />}
            />
            <Input type='tel' placeholder='Search' />
          </InputGroup>

          {questions.map((i, j) => (
            <Question key={j} data={i} />
          ))}
        </QuestionsWrapper>
      </HomeWrapper>
    </>
  )
}
