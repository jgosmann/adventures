import React from "react"

import "./flagIcons.scss"

const FlagSplitEn = () => (
  <span
    css={{
      marginRight: 4,
      position: "relative",
      lineHeight: "1em",
      height: "1em",
      verticalAlign: "text-top",
      width: "calc((4/3) * 1em)",
      display: "inline-block",
      span: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      },
    }}
  >
    <span className="flag-icon flag-icon-us"></span>
    <span
      className="flag-icon flag-icon-gb"
      css={{
        clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
      }}
    ></span>
  </span>
)

export default FlagSplitEn
