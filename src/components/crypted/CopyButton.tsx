import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard } from "@fortawesome/free-regular-svg-icons"
import React from "react"

import AnimatedButton from "../AnimatedButton"

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
