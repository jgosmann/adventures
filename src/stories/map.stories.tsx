import React from "react"
import { ComponentStory } from "@storybook/react"
import MapPage, { MapPageProps } from "../pages/map"
import { postPreview } from "../../test/post-preview-fixture"
import { staticQueryData } from "../../test/static-query-data"

export default {
  title: "Pages/Map",
  component: MapPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

const Template: ComponentStory<typeof MapPage> = (args: MapPageProps) => (
  <div css={{ height: "100vh" }}>
    <MapPage {...args} />
  </div>
)

export const Map = Template.bind({})
Map.args = {
  location: {
    pathname: "/map",
  },
  data: {
    allFile: {
      nodes: [postPreview(0), postPreview(1, "49.2576, -123.1241")],
    },
  },
}
