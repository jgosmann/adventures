import ContentStyleWrapper from "../src/components/ContentStyleWrapper"
import { fontStyle } from "../src/components/HtmlHead/font"

export const decorators = [
  Story => (
    <ContentStyleWrapper>
      <style type="text/css">{fontStyle}</style>
      <Story />
    </ContentStyleWrapper>
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
