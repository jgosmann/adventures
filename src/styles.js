import { css } from "@emotion/core"

export const semanticList = css({
  margin: 0,
  padding: 0,
  listStyleType: "none",
})

export const flexList = css([
  semanticList,
  {
    display: "flex",
  },
])

export const commaSeparatedList = css([
  semanticList,
  {
    "&>li": {
      display: "inline",
      "&:not(:last-of-type):after": {
        content: `", "`,
      },
    },
  },
])

export const fullHeight = css`
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }
`
