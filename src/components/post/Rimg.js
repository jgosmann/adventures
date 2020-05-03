import { css } from "@emotion/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React, { useContext } from "react"

import { GalleryContext } from "./Gallery"

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

const Rimg = ({ alt, caption, image }) => {
  const galleryContext = useContext(GalleryContext)
  const height =
    !galleryContext.active || galleryContext.large ? "80vh" : "45vh"
  const gallerySpecificStyle = {
    "@media screen and (min-height: 600px)": {
      width: `calc(45vh * ${image.childImageSharp.fluid.aspectRatio})`,
      maxHeight: "45vh",
    },
  }

  return (
    <div css={{ margin: galleryContext.active ? 16 : 32, textAlign: "center" }}>
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
            width: `calc(${height} * ${image.childImageSharp.fluid.aspectRatio})`,
            maxHeight: height,
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
            borderRadius: 2,
            ...(galleryContext.active ? gallerySpecificStyle : {}),
          }}
        />
        {caption && <div css={captionStyle}>{caption}</div>}
      </a>
    </div>
  )
}

Rimg.propTypes = {
  alt: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.object.isRequired,
}

export default Rimg
