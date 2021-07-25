import React from 'react'
import { CgComment } from 'react-icons/cg'
import { TiHeart } from 'react-icons/ti'
import { Tag } from '@chakra-ui/react'
import ProfileImage from './ProfileImage'
import styled from 'styled-components'

export default function Question() {
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
    width: 50%;
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

  return (
    <div>
      <QuestionBox>
        <UpperLine>
          <ProfileImage size={50} marginB={0} marginT={0} />
          <p style={{ marginTop: 13, marginLeft: 13 }}>ktrip96</p>

          <Date style={{ marginTop: 13, marginLeft: 13 }}> 10 h ago</Date>
        </UpperLine>
        <QuestionDescription>
          <b>Title of the question</b>
          <p>
            Why the cryptomarket has crashed like hell? Some random text just to
            fill the 2nd line. Stop reading this paragraph, it has no point at
            all?
          </p>
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
          <Tag
            size={'md'}
            variant='solid'
            colorScheme='teal'
            style={{ marginLeft: 'auto', marginRight: 10 }}
          >
            #CryptoSpace
          </Tag>
          <Tag size={'md'} variant='solid' colorScheme='teal'>
            #UnfairLife
          </Tag>
        </LastLine>
      </QuestionBox>
    </div>
  )
}
