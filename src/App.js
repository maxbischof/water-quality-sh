import React from 'react'
import './App.css'

const proxyURL = 'https://cors-anywhere.herokuapp.com/'
const targetURL =
  'http://efi2.schleswig-holstein.de/bg/opendata/v_proben_odata.csv'

export default function App() {
  fetch(proxyURL + targetURL)
    .then((response) => response.text())
    .then((result) => {
      const waterSamples = samplesCsvToArray(result)

      const currentYearSamples = waterSamples.filter(
        (sample) => sample.date > new Date(2019, 12, 31)
      )

      const groupedSamples = groupSamplesByStation(currentYearSamples)

      const latestSamples = getLatestStationSamples(groupedSamples)
    })
    .catch((error) => console.log('error', error))

  return <div className="App"></div>
}

function getLatestStationSamples(samples) {
  const array = []
  const keys = Object.keys(samples)
  keys.forEach((key) => {
    array.push(samples[key])
  })

  const latestSamples = array.map((stationSamples) => {
    let acc = stationSamples[0]
    stationSamples.forEach((crr) => {
      if (acc.date < crr.date) {
        acc = crr
      }
    })
    return acc
  })

  return latestSamples
}

function groupSamplesByStation(samples) {
  const groupedSamples = samples.reduce((acc, crr) => {
    ;(acc[crr['id']] = acc[crr['id']] || []).push(crr)
    return acc
  }, [])
  return groupedSamples
}

function samplesCsvToArray(csv) {
  const linesArray = csv.split('\n')

  let waterSamples = []
  waterSamples = linesArray.map((line) => {
    const attributesArray = line.split('|')

    const waterSampleObject = {}
    waterSampleObject.id = attributesArray[0]
    waterSampleObject.name = attributesArray[1]
    waterSampleObject.waterTemp = attributesArray[12]

    const dateArray = attributesArray[8] ? attributesArray[8].split('.') : ''
    waterSampleObject.date = new Date(
      dateArray[2],
      dateArray[1] - 1,
      dateArray[0]
    )
    return waterSampleObject
  })

  return waterSamples
}
