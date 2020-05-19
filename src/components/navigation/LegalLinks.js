import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { useContext } from "react"

import colors from "../../colors"
import { flexList } from "../../styles"
import MenuContext from "./MenuContext"

const LegalLink = styled(props => {
  const { active } = useContext(MenuContext)
  return <Link tabIndex={active ? 0 : -1} {...props} />
})`
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
