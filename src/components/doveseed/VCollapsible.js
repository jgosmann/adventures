import { css } from "@emotion/core"
import PropTypes from "prop-types"
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

const VCollapsible = ({ children, collapsed }) => (
  <span css={[vcollapsibleStyle, collapsed ? collapsedStyle : undefined]}>
    {children}
  </span>
)

VCollapsible.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
}

export default VCollapsible
