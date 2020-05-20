import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useState } from "react"

import colors from "../../colors"
import Label from "./Label"
import MenuContext from "./MenuContext"
import NavLink from "./NavLink"
import { flexList } from "../../styles"
import { minFullWidth } from "./sizes"

const LabelLine = ({ children, ...props }) => (
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

const Option = styled(props => {
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

  &:hover,
  &.active {
    color: #000;
    border-left: 4px solid ${colors.accent};
  }
`

const YearSelector = ({ path, ...props }) => {
  const [active, setActive] = useState(false)

  const yearIndices = useStaticQuery(graphql`
    query {
      allSitePage(
        filter: { path: { regex: "/^\\\\/year[/].*$/" } }
        sort: { fields: context___year, order: DESC }
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

  const toggleActive = () => setActive(active => !active)

  const yearMatch = path && path.match(/\/year\/(\d+)/)
  const selectedText =
    yearMatch && yearMatch.length > 1 ? yearMatch[1] : "Pick a year"

  return (
    <NavLink
      as="div"
      css={{ position: "relative", padding: 0, "@media": { padding: 0 } }}
      className={yearMatch ? "active" : undefined}
      onClick={toggleActive}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
      {...props}
    >
      <LabelLine>{selectedText}</LabelLine>
      <DropDown
        style={active ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
      >
        <LabelLine>Pick a year</LabelLine>
        <div css={{ overflow: "hidden" }}>
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

YearSelector.propTypes = {
  path: PropTypes.string,
}

export default YearSelector
