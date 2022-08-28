import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { graphql, Link } from "gatsby"
import React from "react"

import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import PostPreviewList from "../components/PostPreviewList"
import { defaultShadedButton } from "../styles"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { PostPreviewProps } from "../components/PostPreview"

export const pageQuery = graphql`
  query ($postIds: [String!]) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "posts" }
        ext: { eq: ".mdx" }
        childMdx: { id: { in: $postIds } }
      }
      sort: { fields: childMdx___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMdx {
          id
          frontmatter {
            draft
          }
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

export interface PostListProps {
  data: {
    allFile: {
      nodes: Array<
        PostPreviewProps["data"] & {
          childMdx: {
            id: string
          }
        }
      >
    }
  }
  location: {
    pathname: string
  }
  pageContext: {
    nextPage?: string
    prevPage?: string
  }
}

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
