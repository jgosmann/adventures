import React from "react"
import GpxTrackComponent from "./GpxTrack"

export default {
  title: "Post/Gpx Track",
  component: GpxTrackComponent,
}

export const GpxTrack = () => <GpxTrackComponent url="/track.gpx" />
