import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import React from "react"

const IconListItem = ({ icon, children }) => (
  <li>
    <FontAwesomeIcon icon={icon} fixedWidth /> {children}
  </li>
)

IconListItem.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default IconListItem
