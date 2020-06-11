import PropTypes from "prop-types"
import React from "react"

import PostPreview from "./PostPreview"

const listStyle = {
  margin: 0,
  padding: 0,

  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
}

const listItemStyle = {
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
}

const PostPreviewList = ({ nodes }) => (
  <ol css={listStyle}>
    {nodes.map(post => (
      <li key={post.childMdx.id} css={listItemStyle}>
        <PostPreview data={post} />
      </li>
    ))}
  </ol>
)

PostPreviewList.propTypes = {
  nodes: PropTypes.arrayOf(PostPreview.propTypes.data),
}

export default PostPreviewList
