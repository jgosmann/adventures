import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import React from "react"

import ContentStyleWrapper from "../components/ContentStyleWrapper"
import CryptedEmail from "../components/crypted/Email"
import CryptedPhone from "../components/crypted/Phone"
import FlagDe from "../components/flags/FlagDe"
import FlagSplitEn from "../components/flags/FlagSplitEn"
import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

export const pageQuery = graphql`
  query ($pageId: String!) {
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

export interface LegalPageProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
      }
      body: string
    }
  }
  location: {
    pathname: string
  }
}

const LegalPage = ({
  data: { mdx },
  location: { pathname },
}: LegalPageProps) => (
  <>
    <HtmlHead path={pathname} title={mdx.frontmatter.title} language="en" />
    <Navigation path={pathname} fixed />
    <main css={{ marginTop: 48 }}>
      <ContentStyleWrapper>
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </ContentStyleWrapper>
    </main>
  </>
)

export default LegalPage