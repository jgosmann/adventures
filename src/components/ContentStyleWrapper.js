import styled from "@emotion/styled"

import { contentBaseStyle } from "../styles"

const ContentStyleWrapper = styled("div")`
  ${contentBaseStyle}

  h1,
  ol,
  p,
  ul,
  h1,
  h2,
  h3 {
    width: 600px;
    max-width: calc(100vw - 32px);
  }

  ul,
  ol {
    box-sizing: border-box;
    ul,
    ol {
      max-width: 100%;
      margin: 0;
    }
  }

  iframe {
    margin: 1em auto;
    display: block;
    max-width: 100vw;
  }

  .attribution {
    color: #888;
    font-size: 0.8em;

    a {
      color: #888;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`

export default ContentStyleWrapper
