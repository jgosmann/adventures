import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import PostPreviewList, { PostPreviewListProps } from "./PostPreviewList"
import { primaryShadedButton } from "../styles"
import Spinner from "./Spinner"
import { css } from "@emotion/react"

export interface SearchViewProps {
  data: PostPreviewListProps["nodes"]
  nextPage?: boolean
  loading: boolean
  error: boolean
  loadMore: () => void
}

export const SearchView = ({
  data,
  nextPage,
  loading,
  error,
  loadMore,
}: SearchViewProps) => {
  const centerStyle = css({ margin: 16, textAlign: "center" })
  if (!loading && !error && data.length == 0) {
    return <p css={centerStyle}>Unfortunately, nothing was found. 😞</p>
  } else {
    return (
      <>
        <PostPreviewList nodes={data} />
        {error && <p css={centerStyle}>Sorry, an error occured. 😵</p>}
        {loading && (
          <div css={centerStyle}>
            <Spinner css={{ fontSize: 48 }} />
          </div>
        )}
        {!loading && nextPage && (
          <div css={centerStyle}>
            <button css={primaryShadedButton} onClick={loadMore}>
              Load more
            </button>
          </div>
        )}
      </>
    )
  }
}

export interface SearchProps {
  query: string
}

interface State extends Omit<SearchViewProps, "loadMore" | "nextPage"> {
  nextPage?: string
}

const Search = ({ query }: SearchProps) => {
  const searchUrl = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          searchUrl
        }
      }
    }
  `).site.siteMetadata.searchUrl
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: false,
  })

  const fetchPage = ({ query, page }: { query: string; page?: string }) =>
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
                id
                background {
                  childImageSharp {
                    gatsbyImageData
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
          error: false,
          loading: false,
        }))
      )
      .catch(error => {
        console.error(error)
        setState({ error: true, loading: false, data: [] })
      })

  useEffect(() => {
    fetchPage({ query })
  }, [query])

  const loadMore = () => {
    setState({ ...state, loading: true })
    fetchPage({ query, page: state.nextPage })
  }
  return (
    <SearchView {...state} nextPage={!!state.nextPage} loadMore={loadMore} />
  )
}

export default Search
