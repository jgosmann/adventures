import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import PostPreviewList from "../components/PostPreviewList"
import { defaultShadedButton } from "../styles"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

export const pageQuery = graphql`
  query($postIds: [String!]) {
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

const PostList = ({
  data: {
    allFile: { nodes },
  },
  location: { pathname },
  pageContext: { nextPage, prevPage },
}) => (
  <>
    <HtmlHead path={pathname} language="en" />
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

PostList.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    nextPage: PropTypes.string,
    prevPage: PropTypes.string,
  }),
}

export default PostList
