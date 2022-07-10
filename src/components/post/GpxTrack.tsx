import { LatLngTuple } from "leaflet"
import React from "react"
import { Polyline, useMap } from "react-leaflet"

import colors from "../../colors"
import Map from "../leaflet/Map"
import WithRemoteGpxTrack from "./WithRemoteGpxTrack"

export interface SetBoundsProps {
  bounds?: LatLngTuple[]
}

const SetBounds = ({ bounds }: SetBoundsProps) => {
  const map = useMap()
  if (bounds) {
    map.fitBounds(bounds)
  }
  return null
}

export interface GpxTrackProps {
  url: string
}

const GpxTrack = ({ url }: GpxTrackProps) => {
  return (
    <WithRemoteGpxTrack
      url={url}
      render={track => {
        const segments: [number, number][][] = track
          ? track.segments.map(segment =>
              segment.map(point => [point.lat ?? 0, point.lon ?? 0])
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

export default GpxTrack
