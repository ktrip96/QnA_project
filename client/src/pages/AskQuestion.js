import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Button, Textarea, Tag, TagLabel, Box } from '@chakra-ui/react'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  const [body, setBody] = useState('')
  const [tagValue, setTagValue] = useState('')
  const [tagArray, setTagArray] = useState(['green', 'red', 'yellow', 'random'])

  function handleSubmit(e) {
    e.preventDefault()
    const newArray = [...tagArray, tagValue]
    setTagArray(newArray)
    setTagValue('')
  }

  return (
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
          Include all the information someone would need to answer your question
        </Description>
        <Textarea
          type='text'
          size='lg'
          onChange={(e) => setBody(e.target.value)}
          value={body}
          mb={3}
        />
        <SubTitle>Tags</SubTitle>
        <Description>
          Add up to 5 tags to describe what your question is about
        </Description>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Type tag here'
            onChange={(e) => setTagValue(e.target.value)}
            value={tagValue}
            mb={3}
          />
        </form>
        <Box mb={3} style={{ display: 'flex' }}>
          {tagArray.map((i, j) => (
            <Hover>
              <Tag
                borderRadius='full'
                variant='solid'
                colorScheme='green'
                mr={3}
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
        >
          Submit
        </Button>
      </QuestionBox>
    </Wrapper>
  )
}
