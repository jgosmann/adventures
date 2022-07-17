import React from "react"

import Map from "../leaflet/Map"
import Marker from "../leaflet/Marker"

const munich: [number, number] = [48.1384, 11.5683]

export interface LocProps {
  latlong: [number, number]
  zoom?: number
}

const Loc = ({ latlong, zoom }: LocProps) => {
  const viewport = zoom
    ? {
        center: latlong,
        zoom: zoom,
      }
    : {
        bounds: [munich, latlong],
        padding: [50, 150],
      }
  return (
    <Map css={{ height: 600, margin: "32px 0" }} {...viewport}>
      <Marker position={latlong} />
    </Map>
  )
}

export default Loc
