import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBell,
  faGlobeEurope,
  faStar,
  faTh,
} from "@fortawesome/free-solid-svg-icons"
import React, { HTMLProps } from "react"

import Label from "./Label"
import NavLink from "./NavLink"
import { flexList } from "../../styles"
import YearSelector from "./YearSelector"
import SearchField from "./SearchField"

export interface MainLinksProps extends HTMLProps<HTMLUListElement> {
  orientation?: "row" | "column"
  path: string
  query?: string
}

const MainLinks = ({ orientation, path, query, ...props }: MainLinksProps) => {
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
        <NavLink
          to="/subscribe/"
          markerSide={markerSide}
          aria-label="Subscribe"
        >
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
        <NavLink to="/map/" markerSide={markerSide} aria-label="Map with posts">
          <FontAwesomeIcon icon={faGlobeEurope} />
          <Label>Map</Label>
        </NavLink>
      </li>
      <li>
        <YearSelector path={path} markerSide={markerSide} />
      </li>
      <li>
        <NavLink
          to="/favorites/"
          markerSide={markerSide}
          aria-label="Top picks"
        >
          <FontAwesomeIcon icon={faStar} />
          <Label>Top picks</Label>
        </NavLink>
      </li>
      <li css={{ flex: 1 }}>
        <SearchField path={path} markerSide={markerSide} query={query} />
      </li>
    </ul>
  )
}

export default MainLinks
