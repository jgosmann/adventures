import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { useContext } from "react"

import colors from "../../colors"
import MenuContext from "./MenuContext"

const marker = ({ markerSide }) =>
  ({
    bottom: css`
      padding: 8px 8px 4px;
      border-bottom: 4px solid rgba(255, 255, 255, 0);
    `,
    left: css`
      padding: 8px;
      border-left: 4px solid rgba(255, 255, 255, 0);
    `,
  }[markerSide || "bottom"])

const NavLink = styled(
  props => {
    const { active } = useContext(MenuContext)
    return (
      <Link activeClassName="active" tabIndex={active ? 0 : -1} {...props} />
    )
  },
  {
    shouldForwardProp: prop => {
      return prop !== "as"
    },
  }
)`
  transition: 0.2s;
  display: block;
  color: #000;
  text-decoration: none;
  ${marker}
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
