import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { GatsbyLinkProps, graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { HTMLProps, useContext, useRef, useState } from "react"

import colors from "../../colors"
import Label from "./Label"
import MenuContext from "./MenuContext"
import NavLink, { NavLinkProps } from "./NavLink"
import { flexList } from "../../styles"
import { minFullWidth } from "./sizes"

interface LabelLineProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

const LabelLine = ({ children, ...props }: LabelLineProps) => (
  <div
    css={{
      whiteSpace: "nowrap",
      padding: "12px 12px 8px",
      [`@media (min-width: ${minFullWidth}px)`]: {
        padding: "8px 8px 4px",
      },
    }}
    {...props}
  >
    <FontAwesomeIcon icon={faCalendarAlt} />
    <Label>{children}</Label>
    <FontAwesomeIcon icon={faCaretDown} css={{ marginLeft: 4 }} />
  </div>
)

LabelLine.propTypes = {
  children: PropTypes.node,
}

const DropDown = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  min-width: 100%;
  background-color: #fff;
  border-radius: 4px;
  padding-bottom: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: 0.2s ease-out;
`

const Options = styled("ol")`
  ${flexList}
  margin-top: 4px;
  flex-direction: column;
  transition: 0.2s ease-out;
`

// Omit of 'ref' is workaround for https://github.com/gatsbyjs/gatsby/issues/16682
const Option = styled(function <TState>(
  props: Omit<GatsbyLinkProps<TState>, "ref">
) {
  const { active } = useContext(MenuContext)
  return (
    <li>
      <Link activeClassName="active" tabIndex={active ? 0 : -1} {...props} />
    </li>
  )
})`
  padding: 8px 12px 8px 8px;
  @media (min-width: ${minFullWidth}px) {
    padding: 4px 8px 4px 24px;
  }
  color: #000;
  width: 100%;
  height: 100%;
  display: inline-block;
  border-left: 4px solid rgba(0, 0, 0, 0);
  transition: 0.2s;

  outline: none;

  &:hover,
  &.active {
    color: #000;
    border-left: 4px solid ${colors.accent};
  }

  &:focus {
    color: ${colors.accent};
  }
`

interface YearIndicesQuery {
  allSitePage: {
    nodes: Array<{
      path: string
      context: {
        year: number
      }
    }>
  }
}

export interface YearSelectorViewProps extends Omit<NavLinkProps<never>, "to"> {
  path: string
  active: boolean
  setActive: (active: boolean) => void
}

export const YearSelectorView = ({
  path,
  active,
  setActive,
  ...props
}: YearSelectorViewProps) => {
  const dropDownButtonRef = useRef(null)

  const yearIndices = useStaticQuery<YearIndicesQuery>(graphql`
    {
      allSitePage(
        filter: { path: { regex: "/^/year[/].*$/" } }
        sort: { context: { year: DESC } }
      ) {
        nodes {
          path
          context {
            year
          }
        }
      }
    }
  `)

  const yearMatch = path && path.match(/\/year\/(\d+)/)
  const selectedText =
    yearMatch && yearMatch.length > 1 ? yearMatch[1] : "Pick a year"

  return (
    <NavLink
      as="div"
      to=""
      role="list"
      ref={dropDownButtonRef}
      css={{
        position: "relative",
        outline: "none",
        padding: 0,
        "@media": { padding: 0 },
      }}
      className={yearMatch ? "active" : undefined}
      onClick={() => setActive(!active)}
      onBlur={() => setActive(false)}
      onFocus={ev => {
        if (ev.target !== dropDownButtonRef.current) {
          setActive(true)
        }
      }}
      tabIndex={-1}
      {...props}
    >
      <LabelLine>{selectedText}</LabelLine>
      <DropDown
        style={active ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
      >
        <LabelLine>Pick a year</LabelLine>
        <div css={{ overflow: "hidden" }} role="listitem">
          <Options
            style={{
              transform: active ? "translateY(0%)" : "translateY(-100%)",
            }}
          >
            {yearIndices.allSitePage.nodes.map(index => (
              <Option
                key={index.context.year}
                to={index.path}
                aria-label={`Posts for the year ${index.context.year}`}
              >
                {index.context.year}
              </Option>
            ))}
          </Options>
        </div>
      </DropDown>
    </NavLink>
  )
}

export type YearSelectorProps = Omit<
  YearSelectorViewProps,
  "active" | "setActive"
>

const YearSelector = ({ ...props }: YearSelectorProps) => {
  const [active, setActive] = useState(false)
  return <YearSelectorView {...props} active={active} setActive={setActive} />
}

export default YearSelector
