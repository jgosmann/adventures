import { css } from "@emotion/react"
import React from "react"

const vcollapsibleStyle = css({
  display: "inline-block",
  transition: "0.2s ease-out",
  height: "100%",
  overflow: "hidden",
  verticalAlign: "middle",
  marginRight: 4,
  opacity: 1,
})

const collapsedStyle = css({
  width: 0,
  marginRight: 0,
  opacity: 0,
})

export interface VCollapsibleProps {
  children?: React.ReactNode
  collapsed?: boolean
}

const VCollapsible = ({ children, collapsed }: VCollapsibleProps) => (
  <span css={[vcollapsibleStyle, collapsed ? collapsedStyle : undefined]}>
    {children}
  </span>
)

export default VCollapsible
