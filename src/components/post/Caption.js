import { css } from "@emotion/react"
import PropTypes from "prop-types"
import React from "react"

const captionStyle = css({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  fontSize: "0.9rem",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: 4,
  boxSizing: "border-box",
  textAlign: "left",
})

const Caption = ({ children }) => <div css={captionStyle}>{children}</div>

Caption.propTypes = {
  children: PropTypes.node,
}

export default Caption
