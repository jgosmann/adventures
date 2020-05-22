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
  h3,
  form {
    width: 600px;
    max-width: calc(100vw - 32px);
  }

  ul {
    ul {
      max-width: calc(100vw - 40px);
    }
  }
`

export default ContentStyleWrapper
