import { keyframes } from "@emotion/react"
import {
  faCheck,
  faCircleNotch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { ProcessingState } from "./ProcessingState"

const spin = keyframes`
  100% { transform: rotate(360deg); }
`

export interface ProcessingStateIconProps {
  state: ProcessingState
}

const ProcessingStateIcon = ({ state }: ProcessingStateIconProps) => {
  switch (state) {
    case ProcessingState.RequestOngoing:
      return (
        <FontAwesomeIcon
          icon={faCircleNotch}
          fixedWidth
          css={{
            animation: `${spin} 1s linear infinite`,
          }}
        />
      )
    case ProcessingState.Success:
      return <FontAwesomeIcon icon={faCheck} fixedWidth />
    case ProcessingState.Error:
      return <FontAwesomeIcon icon={faTimes} fixedWidth />
    default:
      return null
  }
}

export default ProcessingStateIcon
