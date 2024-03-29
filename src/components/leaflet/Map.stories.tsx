import React from "react"
import { StoryFn } from "@storybook/react"
import MapComponent, { MapProps } from "./Map"

export default {
  title: "Leaflet/Map",
  component: MapComponent,
  parameters: {
    chromatic: { diffThreshold: 0.7 },
  },
}

const munich: [number, number] = [48.1384, 11.5683]

const Template: StoryFn<typeof MapComponent> = (args: MapProps) => (
  <MapComponent css={{ height: 400 }} center={munich} zoom={12} {...args} />
)

export const Map = {
  render: Template,
}
