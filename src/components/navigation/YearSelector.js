import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import colors from "../../colors"
import NavLink from "./NavLink"
import { flexList } from "../../styles"

const LabelLine = ({ children, ...props }) => (
  <div
    css={{
      padding: "8px 8px 4px",
      whiteSpace: "nowrap",
    }}
    {...props}
  >
    <FontAwesomeIcon icon={faCalendarAlt} /> {children}{" "}
    <FontAwesomeIcon icon={faCaretDown} />
  </div>
)

LabelLine.propTypes = {
  children: PropTypes.node,
}

const DropDown = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
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

const Option = styled(props => (
  <li>
    <Link activeClassName="active" {...props} />
  </li>
))`
  padding: 4px 4px 4px 24px;
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

const YearSelector = ({ path }) => {
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
      css={{ position: "relative", padding: 0 }}
      className={yearMatch ? "active" : undefined}
      onClick={toggleActive}
    >
      <LabelLine>{selectedText}</LabelLine>
      <DropDown style={{ opacity: active ? 1 : 0 }}>
        <LabelLine>Pick a year</LabelLine>
        <div css={{ overflow: "hidden" }}>
          <Options
            style={{
              transform: active ? "translateY(0%)" : "translateY(-100%)",
            }}
          >
            {yearIndices.allSitePage.nodes.map(index => (
              <Option key={index.context.year} to={index.path}>
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
