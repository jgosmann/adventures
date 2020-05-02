import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons"
import { faTh } from "@fortawesome/free-solid-svg-icons"
import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

import LegalLinks from "./LegalLinks"
import colors from "../../colors"
import { flexList } from "../../styles"

const navStyle = css({
  padding: "0 8px",
  borderBottom: "1px solid #ccc",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
})

const NavLink = styled(props => <Link activeClassName="active" {...props} />)`
  transition: 0.2s;
  display: block;
  color: #000;
  text-decoration: none;
  padding: 8px 8px 4px;
  border-bottom: 4px solid rgba(255, 255, 255, 0);
  height: 100%;
  box-sizing: border-box;

  &:hover,
  &.active {
    border-color: ${colors.accent};
  }
`

const IndexNavigation = () => {
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

  return (
    <nav css={navStyle}>
      <ul css={flexList}>
        <li>
          <NavLink to="/subscribe">
            <FontAwesomeIcon icon={faBell} /> Subscribe
          </NavLink>
        </li>
        <NavLink to="/">
          <FontAwesomeIcon icon={faTh} /> List
        </NavLink>
        <li>
          <NavLink to="/map">
            <FontAwesomeIcon icon={faGlobeEurope} /> Map
          </NavLink>
        </li>
      </ul>
      <ol css={flexList}>
        {yearIndices.allSitePage.nodes.map(index => (
          <li key={index.context.year}>
            <NavLink to={index.path}>{index.context.year}</NavLink>
          </li>
        ))}
      </ol>
      <LegalLinks />
    </nav>
  )
}

export default IndexNavigation
