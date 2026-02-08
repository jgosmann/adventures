import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import AnimatedButton from "../AnimatedButton"
import { faClipboard } from "@fortawesome/free-regular-svg-icons"

export interface CopyButtonProps {
  getCopyText: () => string
  title?: string
}

const CopyButton = ({ getCopyText, title }: CopyButtonProps) => {
  const onClick = () => {
    navigator.clipboard.writeText(getCopyText())
  }
  return (
    <AnimatedButton onClick={onClick} title={title}>
      <FontAwesomeIcon icon={faClipboard} />
    </AnimatedButton>
  )
}

export default CopyButton
