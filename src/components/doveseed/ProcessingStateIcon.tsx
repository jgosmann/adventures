import "./styles.css"
import {
  faCheck,
  faCircleNotch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProcessingState } from "./ProcessingState"

export interface ProcessingStateIconProps {
  state: ProcessingState
}

const ProcessingStateIcon = ({ state }: ProcessingStateIconProps) => {
  switch (state) {
    case ProcessingState.RequestOngoing:
      return <FontAwesomeIcon icon={faCircleNotch} className="anim-spin" />
    case ProcessingState.Success:
      return <FontAwesomeIcon icon={faCheck} />
    case ProcessingState.Error:
      return <FontAwesomeIcon icon={faTimes} />
    default:
      return null
  }
}

export default ProcessingStateIcon
