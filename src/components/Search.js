import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import PostPreviewList from "./PostPreviewList"
import { primaryShadedButton } from "../styles"
import Spinner from "./Spinner"

const Search = ({ query }) => {
  const searchUrl = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          searchUrl
        }
      }
    }
  `).site.siteMetadata.searchUrl
  const [state, setState] = useState({
    data: [],
    nextPage: null,
    loading: true,
  })

  const fetchPage = ({ query, page }) =>
    fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query ($query: String!, $page: String) {
          search(query: $query, page: $page) {
            page
            next
            result {
              pagePath
              childMdx {
                background {
                  childImageSharp {
                    fixed {
                      tracedSVG
                      width
                      height
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
                frontmatter {
                  categories
                  date
                  title
                }
                timeToRead
              }
            }
          }
        }`,
        variables: { query, page },
      }),
    })
      .then(r => r.json())
      .then(({ data }) =>
        setState(current => ({
          data: [...current.data, ...data.search.result],
          nextPage: data.search.next,
          loading: false,
        }))
      )

  useEffect(() => {
    fetchPage({ query })
  }, [query])

  return (
    <>
      <PostPreviewList nodes={state.data} />
      <div
        css={{
          margin: 16,
          textAlign: "center",
        }}
      >
        {state.loading ? (
          <Spinner css={{ fontSize: 48 }} />
        ) : (
          state.nextPage && (
            <button
              css={primaryShadedButton}
              onClick={() => {
                setState({ ...state, loading: true })
                fetchPage({ query, page: state.nextPage })
              }}
            >
              Load more
            </button>
          )
        )}
      </div>
    </>
  )
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
}

export default Search
