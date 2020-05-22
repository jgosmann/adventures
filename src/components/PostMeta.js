import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { semanticList } from "../styles"
import IconListItem from "../components/IconListItem"

export const dataFragment = graphql`
  fragment PostMeta_data on Mdx {
    frontmatter {
      date
    }
    timeToRead
  }
`

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const PostMeta = ({ frontmatter, timeToRead, className }) => (
  <ul css={semanticList} className={className}>
    {frontmatter.date && (
      <IconListItem icon={faCalendarDay} title="Date">
        {dateFormat.format(Date.parse(frontmatter.date))}
      </IconListItem>
    )}
    {timeToRead && (
      <IconListItem icon={faHourglassHalf} title="Estimated reading duration">
        {timeToRead} minute read
      </IconListItem>
    )}
  </ul>
)

PostMeta.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.shape({
    date: PropTypes.string,
  }),
  timeToRead: PropTypes.number,
}

export default PostMeta
