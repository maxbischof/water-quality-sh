import React from 'react';
import './App.css';

const proxyURL = 'https://cors-anywhere.herokuapp.com/'
const targetURL = 'http://efi2.schleswig-holstein.de/bg/opendata/v_proben_odata.csv'

function App() {
  fetch(proxyURL + targetURL)
    .then(response => response.text())
    .then(result => {
      const waterSamples = samplesCsvToArray(result)

      const filteredSamples = waterSamples.filter(sample => sample.date > new Date(2019, 12, 31))
      console.log(filteredSamples)
      })
    .catch(error => console.log('error', error))

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
      waterSampleObject.date = new Date(dateArray[2], dateArray[1], dateArray[0])
      
      return waterSampleObject
    })
    
    //console.log(waterSamples[5])
    return waterSamples
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
