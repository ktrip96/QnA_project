import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import { ImHome } from 'react-icons/im'
import { CgProfile, CgLogIn } from 'react-icons/cg'
import styled from 'styled-components'
import AddNewQuestion from './components/AddNewQuestion'

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext)
  const [page, setPage] = useState('')

  useEffect(() => {
    const url = window.location.href
    const slashIndex = url.indexOf('/', 10) + 1
    if (slashIndex === 0) setPage('')
    else setPage(url.substring(slashIndex))
  }, [])

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

    right: 18%;
    top: 0%;
    display: flex;
    width: 65%;
    justify-content: ${page === 'login' ? 'center' : 'space-around'};
    padding: 10px;
  `

  return (
    <NavbarStyle>
      <StyledLink to='/'>
        <ImHome
          style={{ fontSize: 25, marginTop: 0 }}
          onClick={() => setPage('')}
        />
      </StyledLink>
      {isLoggedIn === false && page !== 'login' && (
        <>
          <div style={{ marginTop: 5 }}>
            <AddNewQuestion />
          </div>
          <StyledLink to='/login' onClick={() => setPage('login')}>
            <CgLogIn style={{ fontSize: 25, marginTop: 10 }} />
          </StyledLink>
        </>
      )}
      {isLoggedIn === true && page !== 'login' && (
        <>
          <div>
            <AddNewQuestion />
          </div>
          <StyledLink to='/myaccount' onClick={() => setPage('myaccount')}>
            <CgProfile style={{ fontSize: 28 }} />
          </StyledLink>
        </>
      )}
    </NavbarStyle>
  )
}
