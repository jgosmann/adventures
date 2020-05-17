import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"

import colors from "../../colors"
import { flexList } from "../../styles"

const LegalLink = styled(Link)`
  text-decoration: none;
  color: #888;

  &:hover {
    color: ${colors.accent};
  }
`

const LegalLinks = props => (
  <ul css={[flexList, { fontSize: "0.7em" }]} {...props}>
    <li>
      <LegalLink to="/legal/privacy">Privacy policy</LegalLink>
    </li>
    <li>
      <LegalLink to="/legal/disclosure">Legal disclosure</LegalLink>
    </li>
  </ul>
)

export default LegalLinks
