import PropTypes from "prop-types"
import React from "react"
import { Polyline, useMap } from "react-leaflet"

import colors from "../../colors"
import Map from "../leaflet/Map"
import WithRemoteGpxTrack from "./WithRemoteGpxTrack"

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
  return (
    <WithRemoteGpxTrack
      url={url}
      render={track => {
        const segments = track
          ? track.segments.map(segment =>
              segment.map(point => [point.lat, point.lon])
            )
          : [[[0, 0]]]
        return (
          <Map css={{ height: 600, margin: "32px 0" }}>
            <SetBounds bounds={segments.flat()} />
            {segments.map((segment, i) => (
              <Polyline color={colors.highlight} key={i} positions={segment} />
            ))}
          </Map>
        )
      }}
    />
  )
}

GpxTrack.propTypes = {
  url: PropTypes.string.isRequired,
}

export default GpxTrack
