import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export interface IconListItemProps {
  icon: IconProp
  children?: React.ReactNode
  title?: string
}

const IconListItem = ({ icon, children, title }: IconListItemProps) => (
  <li>
    <FontAwesomeIcon icon={icon} fixedWidth title={title} /> {children}
  </li>
)

export default IconListItem
