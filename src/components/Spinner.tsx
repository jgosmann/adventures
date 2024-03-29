import { keyframes } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
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
