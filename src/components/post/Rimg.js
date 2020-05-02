import { css } from "@emotion/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"

export const dataFragment = graphql`
  fragment Rimg_data on File {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid_tracedSVG
        aspectRatio
      }
    }
    publicURL
  }
`

const captionStyle = css({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  fontSize: "0.9rem",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: 4,
  boxSizing: "border-box",
  textAlign: "left",
})

const Rimg = ({ alt, caption, image }) => (
  <div css={{ margin: 32, textAlign: "center" }}>
    <a
      css={{ display: "inline-block", position: "relative" }}
      href={image.publicURL}
      title="View full size"
    >
      <Img
        fluid={image.childImageSharp.fluid}
        alt={alt || caption}
        css={{
          maxWidth: "100%",
          width: `calc(80vh * ${image.childImageSharp.fluid.aspectRatio})`,
          maxHeight: "80vh",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          borderRadius: 2,
        }}
      />
      {caption && <div css={captionStyle}>{caption}</div>}
    </a>
  </div>
)

Rimg.propTypes = {
  alt: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.object.isRequired,
}

export default Rimg
