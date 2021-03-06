import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Polyline, useMap } from "react-leaflet"

import colors from "../../colors"
import Map from "../leaflet/Map"

const SetBounds = ({ bounds }) => {
  const map = useMap()
  if (bounds) {
    map.fitBounds(bounds)
  }
  return null
}

SetBounds.propTypes = {
  bounds: PropTypes.array,
}

const GpxTrack = ({ url }) => {
  const [segments, setSegments] = useState([[[0, 0]]])
  useEffect(() => {
    const req = new XMLHttpRequest()
    req.addEventListener("load", () => {
      setSegments(
        Array.from(
          req.responseXML.getElementsByTagName("trkseg")
        ).map(segment =>
          Array.from(segment.getElementsByTagName("trkpt")).map(point => [
            point.getAttribute("lat"),
            point.getAttribute("lon"),
          ])
        )
      )
    })
    req.open("GET", url)
    req.send()
  }, [])

  return (
    <Map css={{ height: 600, margin: "32px 0" }}>
      <SetBounds bounds={segments.flat()} />
      {segments.map((segment, i) => (
        <Polyline color={colors.highlight} key={i} positions={segment} />
      ))}
    </Map>
  )
}

GpxTrack.propTypes = {
  url: PropTypes.string.isRequired,
}

export default GpxTrack
