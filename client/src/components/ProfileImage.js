import React from 'react'
import styled from 'styled-components'
import avatar from '../images/man.jpeg'
import avatar2 from '../images/man.jpg'
import avatar3 from '../images/woman.jpg'
import avatar4 from '../images/woman2.jpg'

/**
      This is a Profile Image component , that gets as a prop the dimension of the profile border.
**/

function returnAvatar(creator) {
  if (creator === undefined) return avatar
  let lastChar = creator[creator.length - 1]
  console.log('last char:', lastChar)
  if (lastChar === 'f') return avatar
  else if (lastChar === '0') return avatar2
  else if (lastChar === 'a') return avatar3
  else return avatar4
}

export default function ProfileImage({ size, marginT, marginB, creator }) {
  const Profile = styled.div`
    border-radius: 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    height: ${size}px;
    width: ${size}px;
    margin-top: ${marginT}px;
    margin-bottom: ${marginB}px;
    background-color: white;
    background-image: url(${returnAvatar(creator)});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `

  return <Profile size={size} creator={creator} />
}
