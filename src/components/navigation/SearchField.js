import PropTypes from "prop-types"
import React, { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import NavLink from "./NavLink"
import colors from "../../colors"

const SearchField = ({ path, query, ...props }) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState(query || "")
  const ref = useRef(null)

  return (
    <NavLink
      as="form"
      className={(active || path.match(/^\/search\/?/)) && "active"}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
      css={{ cursor: "default", display: "flex" }}
      {...props}
      method="get"
      action="/search"
      onSubmit={ev => {
        if (!value) {
          ev.preventDefault()
        }
      }}
    >
      <label
        css={{
          display: "flex",
          flex: 1,
          "&:focus-within": { color: colors.accent },
        }}
      >
        <FontAwesomeIcon
          icon={faSearch}
          title="Search"
          css={{ cursor: "pointer", marginRight: 4 }}
        />
        <input
          ref={ref}
          type="text"
          name="q"
          placeholder="Search"
          value={value}
          onChange={() => setValue(ref.current.value)}
          css={{
            minWidth: 64,
            maxWidth: 320,
            width: "100%",
            flex: 1,
            padding: 0,
            border: "none",
            outline: "none",
            background: "none",
          }}
        />
      </label>
      <button
        title="Submit search"
        css={{
          padding: 0,
          border: "none",
          background: "none",
          cursor: value ? "pointer" : "default",
          visibility: value ? "visible" : "hidden",
          outline: "none",
          "&:focus": { color: colors.accent },
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </button>
    </NavLink>
  )
}

SearchField.propTypes = {
  path: PropTypes.string.isRequired,
  query: PropTypes.string,
}

export default SearchField
