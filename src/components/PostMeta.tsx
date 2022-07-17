import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons"
import { graphql } from "gatsby"
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

export interface PostMetaProps {
  className?: string
  frontmatter: {
    date?: string
  }
  timeToRead?: number
}

const PostMeta = ({ frontmatter, timeToRead, className }: PostMetaProps) => (
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

export default PostMeta
