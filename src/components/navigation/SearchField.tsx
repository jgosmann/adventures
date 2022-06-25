import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import NavLink, { NavLinkProps } from "./NavLink"
import colors from "../../colors"

export interface SearchFieldProps extends Omit<NavLinkProps<never>, "to"> {
  path?: string
  query?: string
}

const SearchField = ({ path, query, ...props }: SearchFieldProps) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState("")
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => setValue(query || ""), [query])

  return (
    <NavLink
      className={
        ((active || (path && path.match(/^\/search\/?/))) ?? undefined) &&
        "active"
      }
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
      css={{ cursor: "default", display: "flex" }}
      as="form"
      {...props}
      // TypeScript does not know about the method prop because we use `as`
      // to dynamically change the link element.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
          type="search"
          name="q"
          placeholder="Search"
          value={value}
          onChange={() => ref.current && setValue(ref.current.value)}
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
        type="submit"
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

export default SearchField
