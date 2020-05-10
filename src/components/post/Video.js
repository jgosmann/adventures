import PropTypes from "prop-types"
import React from "react"

const Video = ({ src }) => (
  <div css={{ textAlign: "center", fontSize: 0, margin: 32 }}>
    <video
      controls
      css={{
        maxHeight: "80vh",
        maxWidth: "100%",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        borderRadius: 2,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  </div>
)

Video.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Video
