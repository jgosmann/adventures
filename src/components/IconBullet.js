import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import React from "react"

import colors from "../colors"

const IconBullet = ({ icon, children }) => (
  <div
    css={{
      display: "flex",
      width: 600,
      maxWidth: "calc(100% - 32px)",
      margin: "auto auto 32px",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    <div
      css={{
        color: "#222",
        fontSize: 48,
        marginTop: "-0.0625em",
        marginRight: 24,
      }}
    >
      <FontAwesomeIcon icon={icon} css={{ color: colors.red }} />
    </div>
    <div
      css={{
        flex: 1,
        minWidth: 300,
      }}
    >
      {children}
    </div>
  </div>
)

IconBullet.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default IconBullet
