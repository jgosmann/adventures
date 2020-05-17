import { Global } from "@emotion/core"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Content from "../components/post/Content"
import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import { fullHeight } from "../styles"
import Titlescreen from "../components/post/Titlescreen"

import "normalize.css"

export const pageQuery = graphql`
  query($postId: String!) {
    mdx(id: { eq: $postId }) {
      background {
        childImageSharp {
          resize(width: 800) {
            src
          }
        }
      }
      excerpt(pruneLength: 500)
      frontmatter {
        title
      }
      body
      ...Titlescreen_data
      ...Content_data
    }
  }
`

// TODO: extract layout component
const PostPage = ({
  data: { mdx },
  location: { pathname },
  pageContext: { nextPath },
}) => (
  <>
    <HtmlHead
      path={pathname}
      description={mdx.excerpt}
      title={mdx.frontmatter.title}
      imageSrc={mdx.background.childImageSharp.resize.src}
      language="en"
    />
    <Global styles={fullHeight} />
    <Navigation fixed />
    <main css={{ height: "100%", position: "relative", zIndex: 0 }}>
      <article css={{ height: "100%" }}>
        <Titlescreen {...mdx} />
        <Content mdx={mdx} nextPath={nextPath} />
      </article>
    </main>
  </>
)

PostPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    nextPath: PropTypes.string,
  }),
}

export default PostPage
