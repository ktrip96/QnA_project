import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {
  Input,
  Button,
  Textarea,
  Tag,
  TagLabel,
  Box,
  useToast,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import Navbar from '../Navbar'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  border: 1px solid #e2e8f0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 60px;
  }
`

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 0.5em;
`

const SubTitle = styled.h1`
  font-size: 1.2em;
  font-weight: bold;
`

const Description = styled.p`
  font-size: 0.8em;
  margin-bottom: 0.5em;
`
const Hover = styled.div`
  transition: transform 0.35s ease-in-out;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.1s;
  }
`

export default function AskQuestion() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagValue, setTagValue] = useState('')
  const [tagArray, setTagArray] = useState([])

  const toast = useToast()
  const history = useHistory()

  function handleForm(e) {
    e.preventDefault()
    const newArray = [...tagArray, tagValue]
    setTagArray(newArray)
    setTagValue('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const keywords = tagArray.join(',')
    const questionData = { title, content, keywords }
    try {
      await axios.post('http://localhost:5000/question', questionData)
      history.push('/')
      toast({
        title: 'Success',
        description: 'Your question was successfully submitted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
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
      <Navbar page='' />
      <Wrapper>
        <QuestionBox>
          <Title> Ask a public question</Title>
          <SubTitle>Title</SubTitle>
          <Description>
            Be specific and imagine you’re asking a question to another person
          </Description>
          <Input
            type='text'
            placeholder='e.g. Is crypto the future of economy?'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            mb={3}
          />
          <SubTitle>Body</SubTitle>
          <Description>
            Include all the information someone would need to answer your
            question
          </Description>
          <Textarea
            type='text'
            size='lg'
            onChange={(e) => setContent(e.target.value)}
            value={content}
            mb={3}
          />
          <SubTitle>Tags</SubTitle>
          <Description>
            Add up to 5 tags to describe what your question is about
          </Description>
          <form onSubmit={handleForm}>
            <Input
              type='text'
              placeholder='Type tag here'
              onChange={(e) => setTagValue(e.target.value)}
              value={tagValue}
            />
          </form>
          <Box mb={3} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tagArray.map((i, j) => (
              <Hover>
                <Tag
                  borderRadius='full'
                  variant='solid'
                  colorScheme='green'
                  mr={3}
                  mt={3}
                  key={j}
                  onClick={(e) =>
                    setTagArray(
                      tagArray.filter((data) => data !== e.target.innerText)
                    )
                  }
                >
                  <TagLabel>{i}</TagLabel>
                </Tag>
              </Hover>
            ))}
          </Box>
          <Button
            size='lg'
            style={{ margin: 'auto' }}
            colorScheme='orange'
            color='white'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </QuestionBox>
      </Wrapper>
    </>
  )
}
