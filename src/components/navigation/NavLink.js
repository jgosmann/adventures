import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { useContext } from "react"

import colors from "../../colors"
import MenuContext from "./MenuContext"
import { minFullWidth } from "./sizes"

const marker = ({ markerSide }) =>
  ({
    bottom: css`
      border-bottom: 4px solid rgba(255, 255, 255, 0);

      padding: 12px 12px 8px;
      @media (min-width: ${minFullWidth}px) {
        padding: 8px 8px 4px;
      }
    `,
    left: css`
      border-left: 4px solid rgba(255, 255, 255, 0);
      padding: 12px;
      @media (min-width: ${minFullWidth}px) {
        padding: 8px;
      }
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
      return !new Set(["as", "markerSide"]).has(prop)
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
  outline: none;

  &:hover,
  &.active {
    border-color: ${colors.accent};
    color: #000;
  }

  &:focus {
    color: ${colors.accent};
  }
`

export default NavLink
