import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"

import colors from "../../colors"

const NavLink = styled(props => <Link activeClassName="active" {...props} />, {
  shouldForwardProp: prop => {
    return prop !== "as"
  },
})`
  transition: 0.2s;
  display: block;
  color: #000;
  text-decoration: none;
  padding: 8px 8px 4px;
  border-bottom: 4px solid rgba(255, 255, 255, 0);
  height: 100%;
  box-sizing: border-box;

  cursor: pointer;
  user-select: none;

  &:hover,
  &.active {
    border-color: ${colors.accent};
    color: #000;
  }
`

export default NavLink
