import { Global } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"

import CollapsedMenu from "./CollapsedMenu"
import ExpandedMenu from "./ExpandedMenu"
import MenuButton from "./MenuButton"
import MenuContext from "./MenuContext"
import { minFullWidth } from "./sizes"

const Navigation = ({ fixed, noTopMargin, path }) => {
  const [expanded, setExpanded] = useState(false)
  const collapseButton = useRef(null)
  const expandButton = useRef(null)

  return (
    <div
      css={
        fixed
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1,
            }
          : undefined
      }
    >
      {fixed && !noTopMargin && (
        <Global
          styles={{
            body: {
              marginTop: 56,
              [`@media (min-width: ${minFullWidth}px)`]: {
                marginTop: 48,
              },
            },
          }}
        />
      )}
      <MenuContext.Provider value={{ active: !expanded }}>
        <CollapsedMenu
          expanded={expanded}
          onExpand={() => {
            setExpanded(true)
          }}
          path={path}
          menuButtonRef={expandButton}
        />
      </MenuContext.Provider>
      <MenuButton
        title={expanded ? "Collapse menu" : "Expand menu"}
        onClick={() => setExpanded(current => !current)}
      >
        <FontAwesomeIcon icon={expanded ? faTimes : faBars} fixedWidth />
      </MenuButton>
      <MenuContext.Provider value={{ active: expanded }}>
        <ExpandedMenu
          expanded={expanded}
          onCollapse={() => {
            setExpanded(false)
          }}
          path={path}
          menuButtonRef={collapseButton}
        />
      </MenuContext.Provider>
    </div>
  )
}

Navigation.propTypes = {
  fixed: PropTypes.bool,
  noTopMargin: PropTypes.bool,
  path: PropTypes.string,
}

export default Navigation
