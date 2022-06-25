import { Global } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import React, { useRef, useState } from "react"

import CollapsedMenu from "./CollapsedMenu"
import ExpandedMenu from "./ExpandedMenu"
import MenuButton from "./MenuButton"
import MenuContext from "./MenuContext"
import { minFullWidth } from "./sizes"

export interface NavigationProps {
  fixed?: boolean
  noTopMargin?: boolean
  path: string
  query?: string
}

const Navigation = ({ fixed, noTopMargin, path, query }: NavigationProps) => {
  const [expanded, setExpanded] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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
        <CollapsedMenu expanded={expanded} path={path} query={query} />
      </MenuContext.Provider>
      <MenuContext.Provider value={{ active: expanded }}>
        <ExpandedMenu expanded={expanded} path={path} query={query} />
      </MenuContext.Provider>
      <MenuButton
        title={expanded ? "Collapse menu" : "Expand menu"}
        onClick={() => setExpanded(current => !current)}
        onMouseLeave={() => menuButtonRef.current?.blur()}
        ref={menuButtonRef}
      >
        <FontAwesomeIcon icon={expanded ? faTimes : faBars} fixedWidth />
      </MenuButton>
    </div>
  )
}

export default Navigation
