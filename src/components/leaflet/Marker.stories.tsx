import React from "react"
import { StoryFn } from "@storybook/react"
import Map from "./Map"
import MarkerComponent from "./Marker"

export default {
  title: "Leaflet/Marker",
  component: MarkerComponent,
  decorators: [
    (Story: StoryFn) => (
      <Map css={{ height: 400 }} center={munich} zoom={12}>
        <Story />
      </Map>
    ),
  ],
  parameters: {
    staticQuery: {
      icon: {
        publicURL: "marker-icon.png",
      },
      iconRetina: {
        publicURL: "marker-icon-2x.png",
      },
      shadow: {
        publicURL: "marker-shadow.png",
      },
    },
    chromatic: { diffThreshold: 0.7 },
  },
}

const munich: [number, number] = [48.1384, 11.5683]

export const Marker = {
  args: {
    position: munich,
  },
}
