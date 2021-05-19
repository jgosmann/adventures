import PropTypes from "prop-types"
import React from "react"

import colors from "../../colors"
import Geodesic from "../leaflet/Geodesic"
import Map from "../leaflet/Map"
import Marker from "../leaflet/Marker"

const GpxTrack = ({ route, markIntermediate }) => {
  return (
    <Map
      css={{ height: 600, margin: "32px 0" }}
      bounds={route}
      padding={[50, 50]}
    >
      <Geodesic latlngs={route} color={colors.red} />
      {markIntermediate ? (
        route.map((stop, i) => <Marker key={i} position={stop} />)
      ) : (
        <>
          <Marker position={route[0]} />
          <Marker position={route[route.length - 1]} />
        </>
      )}
    </Map>
  )
}

GpxTrack.propTypes = {
  route: PropTypes.array.isRequired,
  markIntermediate: PropTypes.bool,
}

export default GpxTrack
