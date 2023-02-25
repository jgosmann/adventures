import React from "react"
import GpxTrackComponent from "./GpxTrack"

export default {
  title: "Post/Gpx Track",
  component: GpxTrackComponent,
  parameters: {
    chromatic: { diffThreshold: 0.7 },
  },
}

export const GpxTrack = () => <GpxTrackComponent url="/track.gpx" />
