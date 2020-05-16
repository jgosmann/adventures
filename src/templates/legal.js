import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import React from "react"

import ContentStyleWrapper from "../components/ContentStyleWrapper"
import CryptedEmail from "../components/crypted/Email"
import CryptedPhone from "../components/crypted/Phone"
import FlagDe from "../components/flags/FlagDe"
import FlagSplitEn from "../components/flags/FlagSplitEn"
import HtmlHead from "../components/HtmlHead"
import IndexNavigation from "../components/navigation/IndexNavigation"

import "normalize.css"

export const pageQuery = graphql`
  query($pageId: String!) {
    mdx(id: { eq: $pageId }) {
      body
      frontmatter {
        title
      }
      ...Content_data
    }
  }
`

const mdxComponents = {
  CryptedEmail,
  CryptedPhone,
  FlagDe,
  FlagSplitEn,
  Link,
}

const PostPage = ({ data: { mdx }, location: { pathname } }) => (
  <>
    <HtmlHead path={pathname} title={mdx.frontmatter.title} language="en" />
    <IndexNavigation />
    <main css={{ height: "100%" }}>
      <ContentStyleWrapper>
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </ContentStyleWrapper>
    </main>
  </>
)

PostPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostPage
