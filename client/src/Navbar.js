import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from './pages/Logout'
import AuthContext from './context/AuthContext'
import { ImHome } from 'react-icons/im'
import { CgProfile, CgLogIn, CgUserAdd } from 'react-icons/cg'
import styled from 'styled-components'

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext)

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: green;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  `

  const NavbarStyle = styled.div`
    overflow: hidden;
    position: absolute;

    right: 17%;
    display: flex;
    width: 65%;
    justify-content: space-around;
    border: 5px solid yellow;
  `
  return (
    <NavbarStyle>
      <StyledLink to='/'>
        Home <ImHome />
      </StyledLink>
      {isLoggedIn === false && (
        <>
          <StyledLink to='/login'>
            Login <CgLogIn />
          </StyledLink>
          <StyledLink to='/signup'>
            Signup <CgUserAdd />
          </StyledLink>
        </>
      )}
      {isLoggedIn === true && (
        <>
          <StyledLink to='/myaccount'>
            My Account <CgProfile />
          </StyledLink>
          <Logout />
        </>
      )}
    </NavbarStyle>
  )
}
