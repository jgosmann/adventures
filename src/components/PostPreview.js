import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"

import { commaSeparatedList, semanticList } from "../styles"

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
    <>
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
            fontWeight: "bold",
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
            <ul css={[semanticList, { lineHeight: 1.3 }]}>
              {data.frontmatter.date && (
                <li>
                  <FontAwesomeIcon icon={faCalendarDay} />{" "}
                  {dateFormat.format(Date.parse(data.frontmatter.date))}
                </li>
              )}
              {data.timeToRead && (
                <li>
                  <FontAwesomeIcon icon={faHourglassHalf} /> {data.timeToRead}{" "}
                  minute read
                </li>
              )}
            </ul>
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
    </>
  )
}

PostPreview.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PostPreview
