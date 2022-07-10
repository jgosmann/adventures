import { css } from "@emotion/react"
import { faBolt } from "@fortawesome/free-solid-svg-icons"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { faDog } from "@fortawesome/free-solid-svg-icons"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { faFirstAid } from "@fortawesome/free-solid-svg-icons"
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons"
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons"
import { faRunning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const circledStyle = css({
  display: "inline-block",
  color: "#fff",
  background: "#000",
  borderRadius: "50%",
  width: "1em",
  height: "1em",
  margin: "0 0.125em",
  textAlign: "center",
})

/* eslint-disable react/display-name */
const styleMap = {
  fa: () => (
    <div css={circledStyle} title="First ascent">
      <span css={{ fontSize: "0.8em", verticalAlign: "text-top" }}>1</span>
    </div>
  ),
  onsight: () => <FontAwesomeIcon icon={faEye} fixedWidth title="Onsight" />,
  flash: () => <FontAwesomeIcon icon={faBolt} fixedWidth title="Flash" />,
  redpoint: () => (
    <FontAwesomeIcon
      icon={faCircle}
      fixedWidth
      css={{ color: "#b51313" }}
      title="Redpoint"
    />
  ),
  repeat: () => <FontAwesomeIcon icon={faRedoAlt} fixedWidth title="Repeat" />,
  hangdog: () => <FontAwesomeIcon icon={faDog} fixedWidth title="Hang dog" />,
  toprope: () => (
    <FontAwesomeIcon icon={faLevelDownAlt} fixedWidth title="Toprope" />
  ),
  "toprope-hangdog": () => (
    <>
      {styleMap["toprope"]()}
      {styleMap["hangdog"]()}
    </>
  ),
  aid: () => <FontAwesomeIcon icon={faFirstAid} fixedWidth title="Aid" />,
  bailed: () => <FontAwesomeIcon icon={faRunning} fixedWidth title="Bailed" />,
  skipped: () => <>skipped</>,
  ["not attempted"]: () => <>not attempted</>,
}
/* eslint-enable react/display-name */

export type AscenionStyle = keyof typeof styleMap

export interface StyleProps {
  ascensionStyle: AscenionStyle
}

const Style = ({ ascensionStyle }: StyleProps) => {
  return styleMap[ascensionStyle]()
}

export default Style
