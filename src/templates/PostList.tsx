import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { graphql, Link, PageProps } from "gatsby"
import React from "react"

import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import PostPreviewList from "../components/PostPreviewList"
import { defaultShadedButton } from "../styles"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

export const pageQuery = graphql`
  query PostList($postIds: [String!]) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "posts" }
        ext: { eq: ".mdx" }
        childMdx: { id: { in: $postIds } }
      }
      sort: { childMdx: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        childMdx {
          id
        }
        ...PostPreview_data
      }
    }
  }
`

export interface HeadProps {
  location: {
    pathname: string
  }
}

export const Head = ({ location: { pathname } }: HeadProps) => (
  <HtmlHead key="global-head" path={pathname} />
)

interface PageContext {
  nextPage?: string
  prevPage?: string
}

export type PostListProps = PageProps<Queries.PostListQuery, PageContext>

const PostList = ({
  data: {
    allFile: { nodes },
  },
  location: { pathname },
  pageContext: { nextPage, prevPage },
}: PostListProps) => (
  <>
    <Navigation path={pathname} fixed />
    <main>
      <PostPreviewList nodes={nodes} />
      {(prevPage || nextPage) && (
        <div
          css={{
            margin: 16,
            textAlign: "center",
            a: {
              margin: 16,
              width: 118,
              color: "#000",
              "&:hover": { color: "#000" },
            },
          }}
        >
          {prevPage && (
            <Link css={defaultShadedButton} to={prevPage}>
              <FontAwesomeIcon icon={faChevronLeft} /> Newer posts
            </Link>
          )}
          {nextPage && (
            <Link css={defaultShadedButton} to={nextPage}>
              Older posts <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          )}
        </div>
      )}
    </main>
  </>
)

export default PostList
