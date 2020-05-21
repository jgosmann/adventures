import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import React from "react"

const IconListItem = ({ icon, children, title }) => (
  <li>
    <FontAwesomeIcon icon={icon} fixedWidth title={title} /> {children}
  </li>
)

IconListItem.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
}

export default IconListItem
