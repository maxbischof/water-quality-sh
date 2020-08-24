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
      <LeafletMap samples={samples} />
    </div>
  )
}
