import PropTypes from "prop-types"
import React, { useState } from "react"

import CollapsedMenu from "./CollapsedMenu"
import ExpandedMenu from "./ExpandedMenu"
import MenuContext from "./MenuContext"

const Navigation = ({ fixed, path }) => {
  const [expanded, setExpanded] = useState(false)

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
      <MenuContext.Provider value={{ active: !expanded }}>
        <CollapsedMenu
          expanded={expanded}
          onExpand={() => setExpanded(true)}
          path={path}
        />
      </MenuContext.Provider>
      <MenuContext.Provider value={{ active: expanded }}>
        <ExpandedMenu
          expanded={expanded}
          onCollapse={() => setExpanded(false)}
          path={path}
        />
      </MenuContext.Provider>
    </div>
  )
}

Navigation.propTypes = {
  fixed: PropTypes.bool,
  path: PropTypes.string,
}

export default Navigation
