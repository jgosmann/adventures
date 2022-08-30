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
    fields {
      timeToRead {
        minutes
      }
    }
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
  fields?: {
    timeToRead?: { minutes: number }
  }
}

const PostMeta = ({ frontmatter, fields, className }: PostMetaProps) => (
  <ul css={semanticList} className={className}>
    {frontmatter.date && (
      <IconListItem icon={faCalendarDay} title="Date">
        {dateFormat.format(Date.parse(frontmatter.date))}
      </IconListItem>
    )}
    {fields?.timeToRead && (
      <IconListItem icon={faHourglassHalf} title="Estimated reading duration">
        {Math.round(fields.timeToRead.minutes)} minute read
      </IconListItem>
    )}
  </ul>
)

export default PostMeta
