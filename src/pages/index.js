import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import HtmlHead from "../components/HtmlHead"
import IndexNavigation from "../components/navigation/IndexNavigation"
import PostPreview from "../components/PostPreview"

import "normalize.css"

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

const IndexPage = ({
  data: {
    allFile: { nodes },
  },
  location: { pathname },
}) => (
  <>
    <HtmlHead path={pathname} language="en" />
    <main>
      <ol css={listStyle}>
        {nodes.map(post => (
          <li key={post.childMdx.id} css={listItemStyle}>
            <PostPreview data={post} />
          </li>
        ))}
      </ol>
    </main>
    <div css={{ position: "fixed", top: 0, left: 0, width: "100%" }}>
      <IndexNavigation path={pathname} />
    </div>
  </>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default IndexPage
