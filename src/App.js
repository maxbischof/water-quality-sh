import React, { useState, useEffect } from 'react'
import './App.css'
import { fetchData, getCurrentSamples, csvToArray } from './components/utils'
import { placesKeys, samplesKeys } from './attributeKeys'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export default function App() {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'
  const samplesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_proben_odata.csv'
  const placesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_badegewaesser_odata.csv'

  const [samples, setSamples] = useState()

  useEffect(() => {
    const samplesPromise = fetchData({ proxyURL, targetURL: samplesURL })
      .then((response) => csvToArray({ csv: response, keys: samplesKeys }))
      .then((array) => getCurrentSamples(array))
      .catch((error) => console.log('error', error))

    const placesPromise = fetchData({ proxyURL, targetURL: placesURL })
      .then((response) => csvToArray({ csv: response, keys: placesKeys }))
      .catch((error) => console.log('error', error))

    Promise.all([samplesPromise, placesPromise]).then((values) =>
      setSamples(
        values[0].map((sample) => {
          const place = values[1].find(
            (place) => place.BADEGEWAESSERID === sample.BADEGEWAESSERID
          )
          sample.GEOGR_BREITE = place.GEOGR_BREITE
          sample.GEOGR_LAENGE = place.GEOGR_LAENGE
          return sample 
        })
      )
    )
  }, [])

  console.log(samples)

  const position = [51.505, -0.09]
  const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
)

  return <div className="App">{map}</div>
}
