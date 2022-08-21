import React from "react"
import { ComponentStory } from "@storybook/react"
import MapComponent, { MapProps } from "./Map"

export default {
  title: "Leaflet/Map",
  component: MapComponent,
  parameters: {
    chromatic: { diffThreshold: 0.4 },
  },
}

const munich: [number, number] = [48.1384, 11.5683]

const Template: ComponentStory<typeof MapComponent> = (args: MapProps) => (
  <MapComponent css={{ height: 400 }} center={munich} zoom={12} {...args} />
)

export const Map = Template.bind({})
