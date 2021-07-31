import React from 'react'
import styled from 'styled-components'
import avatar from '../images/man.jpeg'

/**
      This is a Profile Image component , that gets as a prop the dimension of the profile border.
**/

export default function ProfileImage({ size, marginT, marginB }) {
  const Profile = styled.div`
    border-radius: 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    height: ${size}px;
    width: ${size}px;
    margin-top: ${marginT}px;
    margin-bottom: ${marginB}px;
    background-color: white;
    background-image: url(${avatar});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `
  return <Profile size={size} />
}
