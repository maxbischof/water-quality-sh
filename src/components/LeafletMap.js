import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export default function LeafletMap({ samples }) {
  const samplesMarker = samples.map((sample) => {
    const latLong = [sample.GEOGR_BREITE, sample.GEOGR_LAENGE]
    
    return (
      <Marker key={sample.BADEGEWAESSERID} position={latLong}>
        <Popup>
          {sample.MESSSTELLENNAME}
          <br />
          Wassertemperatur: {sample.WASSERTEMP}
          <br />
          Sichttiefe: {sample.SICHTTIEFE}
        </Popup>
      </Marker>
    )
  })

  const position = [53.92099, 9.51529]
  const map = (
    <Map center={position} zoom={8}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {samplesMarker}
    </Map>
  )

  return <>{map}</>
}
