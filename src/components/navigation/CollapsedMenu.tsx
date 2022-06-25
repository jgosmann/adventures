import React from "react"

import LegalLinks from "./LegalLinks"
import MainLinks from "./MainLinks"
import { minFullWidth } from "./sizes"

export interface CollapsedMenuProps {
  expanded?: boolean
  path: string
  query?: string
}

const CollapsedMenu = ({ expanded, path, query }: CollapsedMenuProps) => (
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

export default CollapsedMenu
