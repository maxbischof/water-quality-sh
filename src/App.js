import React, { useState, useEffect } from 'react'
import './App.css'
import {
  fetchData,
  samplesCsvToArray,
  getCurrentSamples,
  csvToArray,
} from './components/utils'
import { placesKeys } from './attributeKeys'

export default function App() {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'
  const samplesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_proben_odata.csv'
  const placesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_badegewaesser_odata.csv'

  const [samples, setSamples] = useState([])

  useEffect(() => {
    fetchData({ proxyURL, targetURL: samplesURL })
      .then((response) => samplesCsvToArray(response))
      .then((array) => setSamples(getCurrentSamples(array)))
      .catch((error) => console.log('error', error))

    fetchData({ proxyURL, targetURL: placesURL })
      .then((response) => csvToArray({csv: response, keys: placesKeys}))
      .then(array => console.log(array))
  }, [])

  console.log(samples)

  return <div className="App"></div>
}
