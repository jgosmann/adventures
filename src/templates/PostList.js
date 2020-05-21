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
import PostPreview from "../components/PostPreview"
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

const listStyle = {
  margin: 0,
  padding: 0,

  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
}

const listItemStyle = {
  transition: "0.2s",
  display: "block",
  margin: 16,
  borderRadius: 16,
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
  position: "relative",
  width: 300,
  maxWidth: "calc(100vw - 72px)",
  height: 250,
  maxHeight: "calc(100vh - 72px)",

  "&:hover": {
    boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.75)",
  },
}

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
    <main css={{ marginTop: 48 }}>
      <ol css={listStyle}>
        {nodes.map(post => (
          <li key={post.childMdx.id} css={listItemStyle}>
            <PostPreview data={post} />
          </li>
        ))}
      </ol>
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
