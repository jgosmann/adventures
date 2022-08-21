import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

import colors from "../colors"

export interface IconBulletProps {
  icon: IconProp
  children: React.ReactNode
}

const IconBullet = ({ icon, children }: IconBulletProps) => (
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

export default IconBullet
