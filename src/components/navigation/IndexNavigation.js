import { css } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faGlobeEurope, faTh } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import React from "react"

import LegalLinks from "./LegalLinks"
import NavLink from "./NavLink"
import YearSelector from "./YearSelector"
import { flexList } from "../../styles"

const navStyle = css({
  padding: "0 8px",
  borderBottom: "1px solid #ccc",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
})

const IndexNavigation = ({ path }) => {
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
        <li>
          <YearSelector path={path} />
        </li>
      </ul>
      <LegalLinks />
    </nav>
  )
}

IndexNavigation.propTypes = {
  path: PropTypes.string,
}

export default IndexNavigation
