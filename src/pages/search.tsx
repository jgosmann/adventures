import React from "react"

import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import Search from "../components/Search"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

export interface HeadProps {
  location: {
    pathname: string
  }
}

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
  const query = new URLSearchParams(search || "").get("q") || undefined

  return (
    <>
      <Navigation path={pathname} query={query} fixed />
      <main>
        <h1
          css={{
            margin: 32,
            textAlign: "center",
          }}
        >
          Search results for “{query}”
        </h1>
        {query && <Search query={query} />}
      </main>
    </>
  )
}

export default SearchPage
