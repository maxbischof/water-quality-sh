import React from 'react'
import Header from './Header'
import styled from 'styled-components'

export default function MapLayout ({ children }) {
  return <MapContainer>
    <Header/>
    {children}
  </MapContainer>
}

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`