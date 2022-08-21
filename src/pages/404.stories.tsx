import React from "react"
import { ComponentStory } from "@storybook/react"
import NotFoundPage, { NotFoundPageProps } from "./404"

export default {
  title: "Pages/Not Found",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: {
      allSitePage: {
        nodes: [
          { path: "/year/2020", context: { year: 2020 } },
          { path: "/year/2021", context: { year: 2021 } },
          { path: "/year/2022", context: { year: 2022 } },
        ],
      },
      site: {
        siteMetadata: {},
      },
    },
  },
}

const Template: ComponentStory<typeof NotFoundPage> = (
  args: NotFoundPageProps
) => <NotFoundPage {...args} />

export const NotFound = Template.bind({})
NotFound.args = {
  location: {
    pathname: "/foo",
  },
}
