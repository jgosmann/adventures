import PropTypes from "prop-types"
import React from "react"

import { minFullWidth } from "./sizes"

const Label = ({ children }) => (
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

Label.propTypes = {
  children: PropTypes.node,
}

export default Label
