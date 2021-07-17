import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
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
            placeholder: TRACED_SVG
            transformOptions: { cropFocus: ENTROPY }
          )
        }
      }
      frontmatter {
        categories
        date
        title
      }
      timeToRead
    }
    pagePath
  }
`

const textBoxStyle = {
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
}

const PostPreview = ({ data }) => {
  return (
    <Link
      to={data.pagePath}
      css={{ color: "#000", "&:hover": { color: "#000" } }}
    >
      <GatsbyImage
        image={getImage(data.childMdx.background)}
        css={{ width: "100%", height: "100%" }}
        alt=""
      />
      <div css={textBoxStyle}>
        <h2
          css={{
            margin: 0,
            marginBottom: 4,
            fontSize: "1em",
            fontWeight: "normal",
          }}
        >
          {data.childMdx.frontmatter.title}
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
              frontmatter={data.childMdx.frontmatter}
              timeToRead={data.childMdx.timeToRead}
            />
          </li>
          {data.childMdx.frontmatter.categories && (
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

PostPreview.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PostPreview
