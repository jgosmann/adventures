import styled from "@emotion/styled"

import colors from "../colors"

const ContentStyleWrapper = styled("div")`
  margin-top: 32px;

  h1,
  ol,
  p,
  ul,
  h1,
  h2,
  h3,
  form {
    width: 600px;
    max-width: calc(100vw - 32px);
    margin: 0 auto 1em;
    margin-right: auto;
    line-height: 1.25;
    color: #222;
  }

  ul {
    padding: 0 20px;
    box-sizing: border-box;

    ul {
      margin: 0;
      max-width: calc(100vw - 40px);
    }
  }

  a {
    color: ${colors.accent};
    text-decoration: none;
  }

  a:hover {
    color: ${colors.highlight};
  }

  iframe {
    margin: 0;
    width: auto;
    height: auto;
  }
`

export default ContentStyleWrapper
