import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from './context/AuthContext'
import { ImHome } from 'react-icons/im'
import { CgProfile, CgLogIn, CgUserAdd, CgLogOut } from 'react-icons/cg'
import styled from 'styled-components'

export default function Navbar() {
  const { isLoggedIn, getLoggedIn } = useContext(AuthContext)
  const [page, setPage] = useState('')

  useEffect(() => {
    const url = window.location.href
    const slashIndex = url.indexOf('/', 10) + 1
    if (slashIndex === 0) setPage('')
    else setPage(url.substring(slashIndex))
  }, [])

  // When the user presses Logout:
  // => I remove the token from the cookies (I can't do it with JS because cookies are HTTP only, so I post to the following URL)
  // => I need to update my context state from LoggedIn === true to false.
  // => I need to redirect him to the home page

  async function logOut() {
    await axios.post('http://localhost:5000/auth/logout')
    await getLoggedIn()
    setPage('')
  }

  // Styling

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${page === 'myaccount' ? 'white' : 'black'};
    transition: transform 0.3s;
    &:focus,
    &:hover {
      transform: scale(1.2);
    }
    ,
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
    margin: 10px;
  `

  return (
    <NavbarStyle>
      <StyledLink to='/'>
        <ImHome style={{ fontSize: 25 }} onClick={() => setPage('')} />
      </StyledLink>
      {isLoggedIn === false && (
        <>
          <StyledLink to='/login' onClick={() => setPage('login')}>
            Login <CgLogIn />
          </StyledLink>
          <StyledLink to='/signup' onClick={() => setPage('signup')}>
            Signup <CgUserAdd />
          </StyledLink>
        </>
      )}
      {isLoggedIn === true && (
        <>
          <StyledLink to='/myaccount' onClick={() => setPage('myaccount')}>
            <CgProfile style={{ fontSize: 28 }} />
          </StyledLink>
          <StyledLink to=''>
            <CgLogOut onClick={logOut} style={{ fontSize: 28 }} />
          </StyledLink>
        </>
      )}
    </NavbarStyle>
  )
}
