import { Global } from "@emotion/react"
import { graphql, HeadProps, PageProps } from "gatsby"
import React from "react"

import Content from "../components/post/Content"
import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import { fullHeight } from "../styles"
import Titlescreen from "../components/post/Titlescreen"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

export const pageQuery = graphql`
  query PostPage($postId: String!) {
    mdx(id: { eq: $postId }) {
      teaserImg: background {
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
      ...Titlescreen_data
      ...Content_data
    }
  }
`

export const Head = ({
  location: { pathname },
  data: { mdx },
}: HeadProps<Queries.PostPageQuery>) => (
  <HtmlHead
    path={pathname}
    description={mdx?.excerpt}
    title={mdx?.frontmatter?.title}
    imageSrc={mdx?.teaserImg?.childImageSharp?.resize?.src}
  />
)

type PostPageProps = PageProps<Queries.PostPageQuery, { nextPath?: string }>

// TODO: extract layout component
const PostPage = ({
  data: { mdx },
  location: { pathname },
  pageContext,
  children,
}: PostPageProps) => (
  <>
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
        <Titlescreen
          frontmatter={mdx?.frontmatter ?? null}
          background={mdx?.background ?? null}
          fields={mdx?.fields ?? null}
        />
        {mdx && (
          <Content mdx={mdx} nextPath={pageContext?.nextPath}>
            {children}
          </Content>
        )}
        <div css={{ height: "25vh" }}></div>
      </article>
    </main>
  </>
)

export default PostPage
