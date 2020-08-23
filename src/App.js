import React, { useState, useEffect } from 'react'
import './App.css'
import {
  fetchData,
  samplesCsvToArray,
  getCurrentSamples,
  csvToArray,
} from './components/utils'

export default function App() {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'
  const samplesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_proben_odata.csv'
  const placesURL =
    'http://efi2.schleswig-holstein.de/bg/opendata/v_badegewaesser_odata.csv'

  const placesKeys = [
    'BADEGEWAESSERID',
    'BADEGEWAESSERNAME',
    'KURZNAME',
    'ALLGEMEIN_GEBRAEUCHL_NAME',
    'GEWAESSERKATEGORIE',
    'KUESTENGEWAESSER',
    'BADEGEWAESSERTYP',
    'WEITEREBESCHREIBUNG',
    'BADESTELLENLAENGE',
    'EUANMELDUNG',
    'EUABMELDUNG',
    'FLUSSGEBIETSEINHEITID',
    'FLUSSGEBIETSEINHEITNAME',
    'WASSERKOERPERID',
    'WASSERKOERPERNAME',
    'NATWASSERKOERPERID',
    'NATWASSERKOERPERNAME',
    'SCHLUESSELWOERTER',
    'KREISNR',
    'KREIS',
    'GEMEINDENR',
    'GEMEINDE',
    'UTM_OST',
    'UTM_NORD',
    'GEOGR_LAENGE',
    'GEOGR_BREITE',
    'BADESTELLENINFORMATION',
    'AUSWIRKUNGEN_AUF_BADEGEWAESSER',
    'MOEGLICHEBELASTUNGEN',
  ]

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
