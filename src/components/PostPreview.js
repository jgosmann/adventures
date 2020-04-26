import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"

import { commaSeparatedList, semanticList } from "../styles"

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

const PostPreview = ({
  title,
  fixedImage,
  date,
  minutesToRead,
  categories,
}) => {
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return (
    <>
      <Img fixed={fixedImage} css={{ width: "100%", height: "100%" }} />
      <div css={textBoxStyle}>
        <h2
          css={{
            margin: 0,
            marginBottom: 4,
            fontSize: "1em",
            fontWeight: "bold",
          }}
        >
          {title}
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
              {date && (
                <li>
                  <FontAwesomeIcon icon={faCalendarDay} />{" "}
                  {dateFormat.format(date)}
                </li>
              )}
              {minutesToRead && (
                <li>
                  <FontAwesomeIcon icon={faHourglassHalf} /> {minutesToRead}{" "}
                  minute read
                </li>
              )}
            </ul>
          </li>
          {categories && (
            <li>
              <ol css={commaSeparatedList}>
                {categories.map(c => (
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
  categories: PropTypes.arrayOf(PropTypes.string.isRequired),
  date: PropTypes.instanceOf(Date),
  fixedImage: PropTypes.object,
  minutesToRead: PropTypes.number,
  title: PropTypes.string,
}

export default PostPreview
