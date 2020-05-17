import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import React from "react"

import LegalLinks from "./LegalLinks"
import MainLinks from "./MainLinks"
import MenuButton from "./MenuButton"

const ExpandedMenu = ({ expanded, onCollapse, path }) => (
  <nav
    css={{
      position: "absolute",
      top: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      background: "#fff",
      borderBottom: "1px solid #ccc",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
      padding: "0 8px 0 0",
      transition: "opacity 0.2s ease-out",
      zIndex: 1,
      fontSize: 28,
    }}
    style={expanded ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
    className={expanded ? "expanded" : undefined}
  >
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <MainLinks
        path={path}
        orientation="column"
        style={expanded ? {} : { transform: "scaleY(0)" }}
      />
      <div>
        <MenuButton title="Collapse menu" onClick={onCollapse}>
          <FontAwesomeIcon icon={faTimes} />
        </MenuButton>
      </div>
    </div>
    <LegalLinks
      css={{
        marginTop: "1em",
        marginBottom: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100vw",
        li: {
          padding: "4px 4px 4px 12px",
        },
      }}
    />
  </nav>
)

ExpandedMenu.propTypes = {
  expanded: PropTypes.bool,
  onCollapse: PropTypes.func,
  path: PropTypes.string,
}

export default ExpandedMenu
