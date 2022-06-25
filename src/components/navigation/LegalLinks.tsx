import styled from "@emotion/styled"
import { GatsbyLinkProps, Link } from "gatsby"
import React, { HTMLProps, useContext } from "react"

import colors from "../../colors"
import { flexList } from "../../styles"
import MenuContext from "./MenuContext"

// Omit of 'ref' is workaround for https://github.com/gatsbyjs/gatsby/issues/16682
const LegalLink = styled(function <TState>(
  props: Omit<GatsbyLinkProps<TState>, "ref">
) {
  const { active } = useContext(MenuContext)
  return <Link tabIndex={active ? 0 : -1} {...props} />
})`
  white-space: nowrap;
  text-decoration: none;
  color: #888;

  &:hover {
    color: ${colors.accent};
  }
`

const LegalLinks = (props: HTMLProps<HTMLUListElement>) => (
  <ul css={[flexList, { fontSize: "0.7em", marginLeft: 4 }]} {...props}>
    <li>
      <LegalLink to="/legal/privacy/">Privacy policy</LegalLink>
    </li>
    <li>
      <LegalLink to="/legal/disclosure/">Legal disclosure</LegalLink>
    </li>
  </ul>
)

export default LegalLinks
