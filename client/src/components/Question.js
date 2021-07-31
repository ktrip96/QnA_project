import React, { useEffect, useState } from 'react'
import { CgComment } from 'react-icons/cg'
import axios from 'axios'
import { TiHeart } from 'react-icons/ti'
import { Tag } from '@chakra-ui/react'
import ProfileImage from './ProfileImage'
import styled from 'styled-components'

const Date = styled.p`
  color: gray;
`
const Likes = styled.div`
  display: flex;
`

const Comments = styled.div`
  display: flex;
  margin-left: 20px;
`

const UpperLine = styled.div`
  display: flex;
  font-size: 0.8em;
`

const LastLine = styled.div`
  display: flex;
`

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 30px;
  padding: 10px;
  width: 100%;
  margin: auto;
  margin-top: 30px;
`

const QuestionDescription = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`

const IconMargin = {
  marginTop: 4,
}

export default function Question({ data }) {
  const [username, setUsername] = useState()
  const [tags, setTags] = useState([])

  async function getUsername() {
    const response = await axios.get(
      `http://localhost:5000/auth/${data.creator}`
    )
    setUsername(response.data.data.username)
  }

  useEffect(() => {
    const tagArray = data.keywords[0].split(',')
    setTags(tagArray)
    getUsername()
  }, [])

  return (
    <div>
      <QuestionBox>
        <UpperLine>
          <ProfileImage
            size={50}
            marginB={0}
            marginT={0}
            creator={data.creator}
          />
          <p style={{ marginTop: 10, marginLeft: 13, fontSize: '1.3em' }}>
            {username}
          </p>

          <Date style={{ marginTop: 13, marginLeft: 13 }}> 10 h ago</Date>
        </UpperLine>
        <QuestionDescription>
          <b>{data.title}</b>
          <p>{data.content}</p>
        </QuestionDescription>
        <LastLine>
          <Likes>
            <TiHeart style={{ marginTop: 2 }} />
            <p>10</p>
          </Likes>
          <Comments>
            <CgComment style={IconMargin} />
            <p>100</p>
          </Comments>
          <div style={{ marginLeft: 'auto' }}>
            {tags.map((i, j) => (
              <Tag
                size={'md'}
                variant='solid'
                colorScheme='teal'
                style={{ margin: 5 }}
                key={j}
              >
                {i}
              </Tag>
            ))}
          </div>
        </LastLine>
      </QuestionBox>
    </div>
  )
}
