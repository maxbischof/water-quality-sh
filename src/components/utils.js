export function fetchData({proxyURL, targetURL}) {
  return fetch(proxyURL + targetURL)
  .then((response) => response.text())
  .catch((error) => console.log('error', error))
}

export function getCurrentSamples (samplesArray) {

  const filteredSamples = get2020Samples(samplesArray)
  const groupedSamples = groupSamplesByStation(filteredSamples)
  const latestSamples = getLatestStationSamples(groupedSamples)

  return latestSamples
}

function get2020Samples (samplesArray) {
  const datedSamples = samplesArray.map((sample) => {
    const dateArray = sample.DATUMMESSUNG ? sample.DATUMMESSUNG.split('.') : ''
    sample.DATUMMESSUNG = new Date(
      dateArray[2],
      dateArray[1] - 1,
      dateArray[0]
    )
    return sample
  })

  const currentYearSamples = datedSamples.filter(
    (sample) => sample.DATUMMESSUNG > new Date(2019, 12, 31)
  )

  return currentYearSamples
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
    ;(acc[crr['BADEGEWAESSERID']] = acc[crr['BADEGEWAESSERID']] || []).push(crr)
    return acc
  }, [])
  return groupedSamples
}

export function csvToArray({csv, keys}) {
  const linesArray = csv.split('\n')

  let waterSamples = []
  waterSamples = linesArray.map((line) => {
    const attributesArray = line.split('|')
    

    const waterSampleObject = {}
    keys.forEach((key, index) => waterSampleObject[key] = attributesArray[index])
  

    return waterSampleObject
  })

  return waterSamples
}

export function samplesCsvToArray(csv) {
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
