import React from "react"
import { ComponentStory, Story } from "@storybook/react"
import Map from "./Map"
import MarkerComponent, { MarkerProps } from "./Marker"

export default {
  title: "Leaflet/Marker",
  component: MarkerComponent,
  decorators: [
    (Story: Story) => (
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
  },
}

const munich: [number, number] = [48.1384, 11.5683]

const Template: ComponentStory<typeof MarkerComponent> = (
  args: MarkerProps
) => <MarkerComponent {...args} />

export const Marker = Template.bind({})
Marker.args = {
  position: munich,
}
