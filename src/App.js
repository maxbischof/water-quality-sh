import React, { useState, useEffect } from 'react'
import './App.css'
import { fetchData, processCSVData } from './components/utils'

export default function App() {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'
  const targetURL =
  'http://efi2.schleswig-holstein.de/bg/opendata/v_proben_odata.csv'
  const [samples, setSamples] = useState([])

  useEffect(() => {
    fetchData({proxyURL, targetURL})
    .then((result) => setSamples(processCSVData(result)))
    .catch((error) => console.log('error', error))
  }, [])
  
    console.log(samples)

  return <div className="App"></div>
}