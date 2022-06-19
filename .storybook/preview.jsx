import React from "react"
import { fontStyle } from "../src/components/HtmlHead/font"
import { decorator as staticQueryDecorator } from "./mocks/gatsby"

export const decorators = [
  staticQueryDecorator,
  Story => (
    <>
      <style type="text/css">{fontStyle}</style>
      <Story />
    </>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
