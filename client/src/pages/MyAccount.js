import React from 'react'
import styled from 'styled-components'
import ProfileImage from '../components/ProfileImage'
import Question from '../components/Question'

const Background = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  min-height: 22em;
  color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background: rgb(114, 25, 162);
  background: linear-gradient(
    0deg,
    rgba(114, 25, 162, 1) 0%,
    rgba(246, 83, 240, 1) 100%
  );
`

const ProfileBox = styled.div`
  height: 65vh;
  border-radius: 40px 40px 0px 0px;
  width: 70%;
  margin: auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  bottom: 30px;
  background-color: #eff0f7;
  @media (max-width: 768px) {
    width: 100%;
  }
  padding-top: 10px;
`

export default function MyAccount() {
  return (
    <>
      <Background>
        <ProfileImage size={150} marginT={90} marginB={20} />
        <b>
          <h4>ktrip96</h4>
        </b>
        <span style={{ fontWeight: 300, fontFamily: 'Exo' }}>
          I am a software engineer at Google
        </span>
      </Background>
      <ProfileBox>
        <Question />
        <Question />
      </ProfileBox>
    </>
  )
}
