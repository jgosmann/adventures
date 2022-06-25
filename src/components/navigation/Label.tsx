import React from "react"

import { minFullWidth } from "./sizes"

export interface LabelProps {
  children?: React.ReactNode
}

const Label = ({ children }: LabelProps) => (
  <span
    css={{
      marginLeft: 4,
      display: "none",
      [`@media (min-width: ${minFullWidth}px)`]: {
        display: "inline",
      },
      ".expanded &": {
        display: "inline",
      },
    }}
  >
    {children}
  </span>
)

export default Label
