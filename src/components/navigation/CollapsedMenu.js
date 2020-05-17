import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import React from "react"

import LegalLinks from "./LegalLinks"
import MainLinks from "./MainLinks"
import MenuButton from "./MenuButton"
import { minFullWidth } from "./sizes"

const CollapsedMenu = ({ expanded, onExpand, path }) => (
  <nav
    css={{
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "space-between",
      padding: "0 8px",
      borderBottom: "1px solid #ccc",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      fontSize: 28,
      [`@media (min-width: ${minFullWidth}px)`]: {
        fontSize: "1em",
      },
    }}
  >
    <div>
      <MainLinks
        path={path}
        orientation="row"
        style={expanded ? { transform: "scaleX(0)" } : undefined}
      />
    </div>
    <LegalLinks
      css={{
        flexDirection: "column",
        justifyContent: "space-evenly",
        textAlign: "right",
        display: "none",
        [`@media (min-width: ${minFullWidth}px)`]: {
          display: "flex",
        },
      }}
    />
    <div
      css={{
        [`@media (min-width: ${minFullWidth}px)`]: {
          display: "none",
        },
      }}
    >
      <MenuButton title="Expand menu" onClick={onExpand}>
        <FontAwesomeIcon icon={faBars} />
      </MenuButton>
    </div>
  </nav>
)

CollapsedMenu.propTypes = {
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
  path: PropTypes.string,
}

export default CollapsedMenu
