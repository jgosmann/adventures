import { Global } from "@emotion/core"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Content from "../components/post/Content"
import HtmlHead from "../components/HtmlHead"
import IndexNavigation from "../components/navigation/IndexNavigation"
import { fullHeight } from "../styles"
import Titlescreen from "../components/post/Titlescreen"

import "normalize.css"

export const pageQuery = graphql`
  query($postId: String!) {
    mdx(id: { eq: $postId }) {
      body
      ...Titlescreen_data
      ...Content_data
    }
  }
`

// FIXME: open graph meta tags
// TODO: extract layout component
const PostPage = ({ data: { mdx }, location: { pathname } }) => (
  <>
    <HtmlHead path={pathname} language="en" />
    <Global styles={fullHeight} />
    <main css={{ height: "100%" }}>
      <article css={{ height: "100%" }}>
        <Titlescreen {...mdx} />
        <Content mdx={mdx} />
      </article>
    </main>
    <div css={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
      <IndexNavigation />
    </div>
  </>
)

PostPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostPage
