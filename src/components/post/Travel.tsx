import React from "react"

import colors from "../../colors"
import Geodesic from "../leaflet/Geodesic"
import Map from "../leaflet/Map"
import Marker from "../leaflet/Marker"

type Route = Array<[number, number]>

const centerForZoomedViewport = (route: Route): [number, number] => {
  const latitudes = route.map(([lat]) => lat)
  const longitudes = route.map(([, long]) => long)
  return [
    (Math.min(...latitudes) + Math.max(...latitudes)) / 2.0,
    (Math.min(...longitudes) + Math.max(...longitudes)) / 2.0,
  ]
}

export interface TravelProps {
  route: Route
  markIntermediate?: boolean
  zoom?: number
}

const Travel = ({ route, markIntermediate, zoom }: TravelProps) => {
  const viewport = zoom
    ? {
        center: centerForZoomedViewport(route),
        zoom,
      }
    : {
        bounds: route,
        padding: [50, 50],
      }
  return (
    <Map css={{ height: 600, margin: "32px 0" }} {...viewport}>
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

export default Travel
