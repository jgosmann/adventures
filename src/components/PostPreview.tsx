import { css } from "@emotion/react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import React from "react"

import PostMeta from "../components/PostMeta"
import { commaSeparatedList, semanticList } from "../styles"

export const width = 300
export const height = 250

export const dataFragment = graphql`
  fragment PostPreview_data on File {
    childMdx {
      background {
        childImageSharp {
          gatsbyImageData(
            width: 300
            height: 250
            layout: FIXED
            placeholder: DOMINANT_COLOR
            transformOptions: { cropFocus: ENTROPY }
          )
        }
      }
      frontmatter {
        categories
        date
        title
      }
      fields {
        timeToRead {
          minutes
        }
      }
    }
    pagePath
  }
`

const textBoxStyle = css({
  position: "absolute",
  bottom: "0",
  left: "0",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxSizing: "border-box",
  width: "100%",
  minHeight: "50px",
  padding: "8px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
})

type PostPreviewData = Queries.PostPreview_dataFragment

export interface PostPreviewProps {
  data: PostPreviewData
}

const PostPreview = ({ data }: PostPreviewProps) => {
  const background = getImage(data.childMdx?.background as ImageDataLike)
  return (
    <Link
      to={data.pagePath}
      css={{ color: "#000", "&:hover": { color: "#000" } }}
    >
      {background && (
        <GatsbyImage
          image={background}
          css={{ width: "100%", height: "100%" }}
          alt=""
        />
      )}
      <div css={textBoxStyle}>
        <h2
          css={{
            margin: 0,
            marginBottom: 4,
            fontSize: "1em",
            fontWeight: "normal",
          }}
        >
          {data.childMdx?.frontmatter?.title}
        </h2>
        <ul
          css={[
            semanticList,
            {
              justifyContent: "space-between",
              alignItems: "flex-end",
              display: "flex",
              opacity: 0.6,
              fontSize: "0.8em",
              "&>li": {
                "&:not(:last-of-type)": {
                  marginRight: 16,
                },
              },
            },
          ]}
        >
          <li css={{ whiteSpace: "nowrap" }}>
            <PostMeta
              frontmatter={data.childMdx?.frontmatter}
              fields={data.childMdx?.fields}
            />
          </li>
          {data.childMdx?.frontmatter?.categories && (
            <li>
              <ol css={commaSeparatedList}>
                {data.childMdx.frontmatter.categories.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
            </li>
          )}
        </ul>
      </div>
    </Link>
  )
}

export default PostPreview
