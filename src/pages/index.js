import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import HtmlHead from "../components/HtmlHead"
import IndexNavigation from "../components/navigation/IndexNavigation"
import PostPreview from "../components/PostPreview"

import "normalize.css"

export const pageQuery = graphql`
  query($postIds: [String!]) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { id: { in: $postIds } }
    ) {
      nodes {
        id
        frontmatter {
          draft
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
    transform: "translate(-2px, -2px)",
    boxShadow: "2px 3px 4px rgba(0, 0, 0, 0.5)",
  },
}

const IndexPage = ({
  data: {
    allMdx: { nodes },
  },
  location: { pathname },
}) => (
  <>
    <HtmlHead path={pathname} language="en" />
    <IndexNavigation />
    <main>
      <ol css={listStyle}>
        {nodes.map(post => (
          <li key={post.id} css={listItemStyle}>
            <PostPreview data={post} />
          </li>
        ))}
      </ol>
    </main>
  </>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default IndexPage
