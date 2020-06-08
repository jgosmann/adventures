import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import PostPreviewList from "./PostPreviewList"

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
  const [data, setData] = useState(null)
  useEffect(() => {
    console.log("here", searchUrl)
    fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query ($query: String!) {
          search(query: $query) {
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
        variables: { query },
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setData(data))
  }, [query])

  return data && <PostPreviewList nodes={data.search.result} />
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
}

export default Search
