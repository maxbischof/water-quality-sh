import React, { useState, useEffect } from 'react'
import './App.css'
import {
  fetchData,
  getCurrentSamples,
  csvToArray,
  joinPositionOnSamples,
} from './components/utils'
import { placesKeys, samplesKeys } from './attributeKeys'
import LeafletMap from './components/LeafletMap'
import styled from 'styled-components'
import welcomeImage from './images/meer.jpg'
import { Switch, Route, Link } from 'react-router-dom'
import MapLayout from './components/MapLayout'

export default function App() {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'
  const samplesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_proben_odata.csv'
  const placesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_badegewaesser_odata.csv'

  const [samples, setSamples] = useState([])

  useEffect(() => {
    const samplesPromise = fetchData({ proxyURL, targetURL: samplesURL })
      .then((response) => csvToArray({ csv: response, keys: samplesKeys }))
      .then((array) => getCurrentSamples(array))
      .catch((error) => console.log('error', error))

    const placesPromise = fetchData({ proxyURL, targetURL: placesURL })
      .then((response) => csvToArray({ csv: response, keys: placesKeys }))
      .catch((error) => console.log('error', error))

    Promise.all([samplesPromise, placesPromise]).then((values) => {
      const samplesWithLocation = joinPositionOnSamples({
        samples: values[0],
        places: values[1],
      })
      setSamples(samplesWithLocation)
    })
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/map">
          <MapLayout>
            <LeafletMap samples={samples} />
          </MapLayout>
        </Route>

        <Route path="/">
          <WelcomeSection>
            <Headline>Badegewässerqualität in Schleswig Holstein</Headline>
            <SubHeadline>Über 300 Messtellen mit aktuellen Werten</SubHeadline>
            <Link to="/map">
              <Button>Zur Karte</Button>
            </Link>
          </WelcomeSection>
        </Route>
      </Switch>
      
      
    </div>
  )
}

const Headline = styled.h1`
  color: white;
  font-size: 35px;
  font-weight: 300;
`

const SubHeadline = styled.h2`
  color: white;
  font-size: 20px;
`

const Button = styled.button`
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  background-color: #e63946;
  text-align: center;
  border: none;
  border-radius: 2px;
  height: 36px;
  padding: 0 16px;
  margin: 20px 0px 0px 0px;
  text-transform: uppercase;
  text-align: center;
  margin: 20px;
  cursor: pointer;
`

const WelcomeSection = styled.section`
  height: 100vh;
  background: url('${welcomeImage}')no-repeat center center fixed; 
  background-size: cover;
  padding: 100px 0 0 0;
`