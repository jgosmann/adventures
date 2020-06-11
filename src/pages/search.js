import PropTypes from "prop-types"
import React from "react"

import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import Search from "../components/Search"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

const PostList = ({ location: { pathname, search } }) => {
  const query = new URLSearchParams(search || "").get("q")

  return (
    <>
      <HtmlHead path={pathname} language="en" />
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

PostList.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
}

export default PostList
