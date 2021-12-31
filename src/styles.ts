import { css } from "@emotion/react"

import colors from "./colors"

export const contentBaseStyle = css`
  h1,
  ol,
  p,
  ul,
  h1,
  h2,
  h3,
  form {
    margin: 0 auto 1em;
    line-height: 1.25;
    color: #222;
  }

  ul {
    padding: 0 20px;
    box-sizing: border-box;

    ul {
      margin: 0;
    }
  }
`

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

export const shadedButton = ({
  mainColor,
  highlight,
  shade,
}: {
  mainColor: string
  highlight: string
  shade: string
}) => css`
  background-color: ${mainColor};
  background: linear-gradient(180deg, ${mainColor} 60%, ${shade} 100%);
  border: none;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  transition: 0.2s;
  cursor: pointer;
  display: inline-block;

  margin-left: 8px;
  margin-right: 8px;

  &:hover {
    background-color: $highlight;
    background: linear-gradient(180deg, ${highlight} 60%, ${shade} 100%);
  }

  &:active {
    transition: 0s;
    background: ${mainColor};
  }
`

export const primaryShadedButton = css([
  shadedButton(colors.button.primary),
  css`
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  `,
])
export const defaultShadedButton = shadedButton(colors.button.default)
