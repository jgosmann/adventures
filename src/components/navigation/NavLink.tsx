import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { GatsbyLinkProps, Link } from "gatsby"
import React, { useContext } from "react"

import colors from "../../colors"
import MenuContext from "./MenuContext"
import { minFullWidth } from "./sizes"

interface MarkerStyleArgs {
  markerSide?: "bottom" | "left"
}

const marker = ({ markerSide }: MarkerStyleArgs) =>
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

// Omit of 'ref' is workaround for https://github.com/gatsbyjs/gatsby/issues/16682
export interface NavLinkProps<TState>
  extends Omit<GatsbyLinkProps<TState>, "ref">,
    MarkerStyleArgs {
  as?: React.ElementType
  ref?: React.LegacyRef<Link<TState>> & React.LegacyRef<HTMLAnchorElement>
}

const NavLink = styled(
  function <TState>(props: NavLinkProps<TState>) {
    const { active } = useContext(MenuContext)
    return (
      <Link activeClassName="active" tabIndex={active ? 0 : -1} {...props} />
    )
  },
  {
    shouldForwardProp: (prop: string) => {
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
  white-space: nowrap;

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
