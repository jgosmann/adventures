import React from "react"
import { fontStyle } from "../src/components/HtmlHead/font"
import { decorator as staticQueryDecorator } from "../test/mockStaticQuery"
import { initialize, mswDecorator } from "msw-storybook-addon"
import { handlers } from "../src/mocks/handlers"

initialize()

export const decorators = [
  mswDecorator,
  staticQueryDecorator,
  Story => (
    <>
      <style type="text/css">{fontStyle}</style>
      <Story />
    </>
  ),
]

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers,
  },
}
