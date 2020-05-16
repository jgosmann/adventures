import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"

import colors from "../../colors"
import { flexList } from "../../styles"

const style = css({
  flexDirection: "column",
  justifyContent: "space-evenly",
  fontSize: "0.75em",
  textAlign: "right",
})

const LegalLink = styled(Link)`
  text-decoration: none;
  color: #888;

  &:hover {
    color: ${colors.accent};
  }
`

const LegalLinks = () => (
  <ul css={[flexList, style]}>
    <li>
      <LegalLink to="/legal/privacy">Privacy policy</LegalLink>
    </li>
    <li>
      <LegalLink to="/legal/disclosure">Legal disclosure</LegalLink>
    </li>
  </ul>
)

export default LegalLinks
