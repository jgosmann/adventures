import React, { useEffect, useState } from "react"

import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import Search from "../components/Search"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { HeadProps } from "gatsby"

export const Head = ({ location: { pathname } }: HeadProps) => (
  <HtmlHead path={pathname} />
)

export interface SearchPageProps {
  location: {
    pathname: string
    search?: string
  }
}

const SearchPage = ({ location: { pathname, search } }: SearchPageProps) => {
  const [query, setQuery] = useState<string | undefined>(undefined)
  useEffect(() =>
    setQuery(new URLSearchParams(search || "").get("q") || undefined)
  )

  return (
    <>
      <Navigation path={pathname} query={query} fixed />
      <main>
        {query && (
          <>
            <h1
              css={{
                margin: 32,
                textAlign: "center",
              }}
            >
              Search results for “{query}”
            </h1>
            <Search query={query} />
          </>
        )}
      </main>
    </>
  )
}

export default SearchPage
