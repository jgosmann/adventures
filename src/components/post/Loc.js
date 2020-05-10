import PropTypes from "prop-types"
import React from "react"

import Map from "../leaflet/Map"
import Marker from "../leaflet/Marker"

const munich = [48.1384, 11.5683]

const GpxTrack = ({ latlong, zoom }) => {
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

GpxTrack.propTypes = {
  latlong: PropTypes.array.isRequired,
  zoom: PropTypes.number,
}

export default GpxTrack
