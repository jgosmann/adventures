import React from "react"
import { ComponentStory, Story } from "@storybook/react"
import Map from "./Map"
import GeodesicComponent, { GeodesicProps } from "./Geodesic"

export default {
  title: "Leaflet/Geodesic",
  component: GeodesicComponent,
  decorators: [
    (Story: Story) => (
      <Map css={{ height: 400 }} center={[50, -30]} zoom={4}>
        <Story />
      </Map>
    ),
  ],
}

const munich: [number, number] = [48.1384, 11.5683]
const frankfurt: [number, number] = [50.1066, 8.6626]
const toronto: [number, number] = [43.6732, -79.3857]

const Template: ComponentStory<typeof GeodesicComponent> = (
  args: GeodesicProps
) => <GeodesicComponent {...args} />

export const Geodesic = Template.bind({})
Geodesic.args = {
  latlngs: [munich, frankfurt, toronto],
}
