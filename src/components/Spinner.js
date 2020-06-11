import { keyframes } from "@emotion/core"
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome")
const { faCircleNotch } = require("@fortawesome/free-solid-svg-icons")
import React from "react"

const spin = keyframes`
  100% { transform: rotate(360deg); }
`

const Spinner = ({ ...props }) => (
  <FontAwesomeIcon
    icon={faCircleNotch}
    title="Loading"
    css={{
      animation: `${spin} 1s linear infinite`,
    }}
    {...props}
  />
)

export default Spinner
