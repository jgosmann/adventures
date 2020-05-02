import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"

import PostMeta from "../components/PostMeta"
import { commaSeparatedList, semanticList } from "../styles"

export const width = 300
export const height = 250

export const dataFragment = graphql`
  fragment PostPreview_data on Mdx {
    background {
      childImageSharp {
        fixed(width: 300, height: 250) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    frontmatter {
      categories
      date
      title
    }
    parent {
      ... on File {
        relativeDirectory
      }
    }
    timeToRead
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
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return (
    <Link
      to={`/posts/${data.parent.relativeDirectory}`}
      css={{ color: "#000" }}
    >
      <Img
        fixed={data.background.childImageSharp.fixed}
        css={{ width: "100%", height: "100%" }}
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
          {data.frontmatter.title}
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
              frontmatter={data.frontmatter}
              timeToRead={data.timeToRead}
            />
          </li>
          {data.frontmatter.categories && (
            <li>
              <ol css={commaSeparatedList}>
                {data.frontmatter.categories.map(c => (
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
