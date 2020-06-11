import PropTypes from "prop-types"
import React from "react"

import LegalLinks from "./LegalLinks"
import MainLinks from "./MainLinks"
import { minFullWidth } from "./sizes"

const CollapsedMenu = ({ expanded, path, query }) => (
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
    }}
  >
    <div
      css={{
        marginRight: 48,
        [`@media (min-width: ${minFullWidth}px)`]: {
          marginRight: 0,
        },
      }}
    >
      <MainLinks
        path={path}
        orientation="row"
        query={query}
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
  </nav>
)

CollapsedMenu.propTypes = {
  expanded: PropTypes.bool,
  path: PropTypes.string,
  query: PropTypes.string,
}

export default CollapsedMenu
