import React from "react"
import { fontStyle } from "../src/components/HtmlHead/font"

export const decorators = [
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
