import React from 'react'
import styled from 'styled-components'
import backIcon from '../icons/back.svg'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <HeaderContainer>
      <IconContainer>
        <Link to="/">
          <BackIcon src={backIcon} alt="back button" />
          <IconText>Zurück</IconText>
        </Link>
      </IconContainer>
      <Headline>Badegewässer Karte</Headline>
    </HeaderContainer>
  )
}

const IconContainer = styled.div`
  position: absolute;
  left: 10px;
  a {
    text-decoration: none;
  }
`

const HeaderContainer = styled.header`
  height: 50px;
  background-color: white;
  border-bottom: 1px solid #adb5bd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 10px;
`

const BackIcon = styled.img`
  height: 15px;
  position: relative;
  top: 2px;
`

const IconText = styled.span`
  margin-left: 5px;
  font-size: 15px;
  font-weight: 500;
  color: #0096c7;
`

const Headline = styled.h1`
  font-size: 17px;
  justify-self: center;
`
