import React from "react"
import { ComponentStory } from "@storybook/react"
import NotFoundPage, { NotFoundPageProps } from "./404"
import { staticQueryData } from "../../test/static-query-data"

export default {
  title: "Pages/Not Found",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
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
