import styled from "@emotion/styled"

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
`

export default ContentStyleWrapper
