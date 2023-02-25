import React from "react"

import LegalLinks from "./LegalLinks"
import MainLinks from "./MainLinks"

export interface ExpandedMenuProps {
  expanded?: boolean
  path: string
  query?: string
}

const ExpandedMenu = ({ expanded, path, query }: ExpandedMenuProps) => (
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
      overflow: "hidden",
    }}
    style={expanded ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
    className={expanded ? "expanded" : undefined}
  >
    <MainLinks
      path={path}
      orientation="column"
      query={query}
      style={expanded ? {} : { transform: "scaleY(0)" }}
    />
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

export default ExpandedMenu
