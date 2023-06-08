import React from "react"
import { StoryFn } from "@storybook/react"
import Map from "./Map"
import GeodesicComponent from "./Geodesic"

export default {
  title: "Leaflet/Geodesic",
  component: GeodesicComponent,
  decorators: [
    (Story: StoryFn) => (
      <Map css={{ height: 400 }} center={[50, -30]} zoom={4}>
        <Story />
      </Map>
    ),
  ],
  parameters: {
    chromatic: { diffThreshold: 0.7 },
  },
}

const munich: [number, number] = [48.1384, 11.5683]
const frankfurt: [number, number] = [50.1066, 8.6626]
const toronto: [number, number] = [43.6732, -79.3857]

export const Geodesic = {
  args: {
    latlngs: [munich, frankfurt, toronto],
  },
}
