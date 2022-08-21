import { Global } from "@emotion/react"
import { graphql } from "gatsby"
import React from "react"

import Content, { ContentMdx } from "../components/post/Content"
import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import { fullHeight } from "../styles"
import Titlescreen from "../components/post/Titlescreen"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { ImageDataLike } from "gatsby-plugin-image"

export const pageQuery = graphql`
  query ($postId: String!) {
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

export interface PostPageProps {
  data: {
    mdx: ContentMdx & {
      excerpt: string
      frontmatter: {
        date: string
        title: string
      }
      timeToRead: number
      background: ImageDataLike & {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
  location: {
    pathname: string
  }
  pageContext?: {
    nextPath?: string
  }
}

// TODO: extract layout component
const PostPage = ({
  data: { mdx },
  location: { pathname },
  pageContext,
}: PostPageProps) => (
  <>
    <HtmlHead
      path={pathname}
      description={mdx.excerpt}
      title={mdx.frontmatter.title}
      imageSrc={mdx.background.childImageSharp.resize.src}
      language="en"
    />
    <Global styles={fullHeight} />
    <Navigation path={pathname} fixed noTopMargin />
    <main
      css={{
        height: "100%",
        position: "relative",
        zIndex: 0,
      }}
    >
      <article css={{ height: "100%" }}>
        <Titlescreen {...mdx} />
        <Content mdx={mdx} nextPath={pageContext?.nextPath} />
        <div css={{ height: "25vh" }}></div>
      </article>
    </main>
  </>
)

export default PostPage
