import { css } from "@emotion/react"
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

export interface CaptionProps {
  children?: React.ReactNode
}

const Caption = ({ children }: CaptionProps) => (
  <div css={captionStyle}>{children}</div>
)

export default Caption
