import "./styles.css"
import React, { type CSSProperties } from "react"

const collapsedStyle: CSSProperties = {
  width: 0,
  marginRight: 0,
  opacity: 0,
}

export interface VCollapsibleProps {
  children?: React.ReactNode
  collapsed?: boolean
}

const VCollapsible = ({ children, collapsed }: VCollapsibleProps) => (
  <span className="vcollapsible" style={collapsed ? collapsedStyle : {}}>
    {children}
  </span>
)

export default VCollapsible
