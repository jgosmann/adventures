import { css } from "@emotion/react"
import React from "react"

import PostPreview, { PostPreviewProps } from "./PostPreview"

const listStyle = css({
  margin: 0,
  padding: 0,

  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
})

const listItemStyle = css({
  transition: "0.2s",
  display: "block",
  margin: 16,
  borderRadius: 16,
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
  position: "relative",
  width: 300,
  maxWidth: "calc(100vw - 72px)",
  height: 250,
  maxHeight: "calc(100vh - 72px)",

  "&:hover": {
    boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.75)",
  },

  "&:focus-within": {
    boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.75)",
  },
})

export interface PostPreviewListProps {
  nodes: Array<
    PostPreviewProps["data"] & {
      childMdx: {
        id: string
      }
    }
  >
}

const PostPreviewList = ({ nodes }: PostPreviewListProps) => (
  <ol css={listStyle}>
    {nodes.map(post => (
      <li key={post.childMdx.id} css={listItemStyle}>
        <PostPreview data={post} />
      </li>
    ))}
  </ol>
)

export default PostPreviewList
