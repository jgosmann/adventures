import { graphql, Link } from "gatsby"
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

export interface HeadProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
      }
    }
  }
  location: {
    pathname: string
  }
}

export const Head = ({ location: { pathname }, data: { mdx } }: HeadProps) => (
  <HtmlHead path={pathname} title={mdx.frontmatter.title} />
)

const mdxComponents = {
  CryptedEmail,
  CryptedPhone,
  FlagDe,
  FlagSplitEn,
  Link,
}

export interface LegalPageProps {
  location: {
    pathname: string
  }
  pageContext: { language: string }
  children: React.ReactNode
}

const LegalPage = ({
  location: { pathname },
  pageContext: { language },
  children,
}: LegalPageProps) => (
  <>
    <Navigation path={pathname} fixed />
    <main css={{ marginTop: 48 }} lang={language}>
      <ContentStyleWrapper>
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </ContentStyleWrapper>
    </main>
  </>
)

export default LegalPage
