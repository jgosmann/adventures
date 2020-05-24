import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faGlobeEurope, faTh } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import React from "react"

import Label from "./Label"
import NavLink from "./NavLink"
import { flexList } from "../../styles"
import YearSelector from "./YearSelector"

const MainLinks = ({ orientation, path, ...props }) => {
  const markerSide = orientation === "column" ? "left" : "bottom"
  return (
    <ul
      css={[
        flexList,
        {
          flexDirection: orientation || "row",
          transformOrigin: "top left",
          transition: "transform 0.2s ease-out",
        },
      ]}
      {...props}
    >
      <li>
        <NavLink to="/subscribe" markerSide={markerSide} aria-label="Subscribe">
          <FontAwesomeIcon icon={faBell} />
          <Label>Subscribe</Label>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" markerSide={markerSide} aria-label="List of posts">
          <FontAwesomeIcon icon={faTh} />
          <Label>List</Label>
        </NavLink>
      </li>
      <li>
        <NavLink to="/map" markerSide={markerSide} aria-label="Map with posts">
          <FontAwesomeIcon icon={faGlobeEurope} />
          <Label>Map</Label>
        </NavLink>
      </li>
      <li>
        <YearSelector path={path} markerSide={markerSide} />
      </li>
    </ul>
  )
}

MainLinks.propTypes = {
  orientation: PropTypes.oneOf(["row", "column"]),
  path: PropTypes.string,
}

export default MainLinks
