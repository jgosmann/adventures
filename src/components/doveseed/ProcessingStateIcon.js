import { keyframes } from "@emotion/core"
import {
  faCheck,
  faCircleNotch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import React from "react"

const spin = keyframes`
  100% { transform: rotate(360deg); }
`

const ProcessingStateIcon = ({ state }) => {
  switch (state) {
    case "requestOngoing":
      return (
        <FontAwesomeIcon
          icon={faCircleNotch}
          fixedWidth
          css={{
            animation: `${spin} 1s linear infinite`,
          }}
        />
      )
    case "success":
      return <FontAwesomeIcon icon={faCheck} fixedWidth />
    case "error":
      return <FontAwesomeIcon icon={faTimes} fixedWidth />
    default:
      return null
  }
}

ProcessingStateIcon.propTypes = {
  state: PropTypes.oneOf(["initial", "requestOngoing", "success", "error"]),
}

export default ProcessingStateIcon
