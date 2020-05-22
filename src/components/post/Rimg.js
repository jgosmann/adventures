import { graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React, { useContext } from "react"

import Caption from "./Caption"
import { GalleryContext } from "./Gallery"

export const dataFragment = graphql`
  fragment Rimg_data on File {
    childImageSharp {
      rimg: fluid {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
        aspectRatio
      }
    }
    publicURL
  }
`

const Rimg = ({ alt, caption, image }) => {
  const galleryContext = useContext(GalleryContext)
  const height =
    !galleryContext.active || galleryContext.large ? "80vh" : "45vh"
  const gallerySpecificStyle = {
    "@media screen and (min-height: 600px)": {
      width: `calc(45vh * ${image.childImageSharp.rimg.aspectRatio})`,
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
          fluid={image.childImageSharp.rimg}
          alt={alt || caption}
          css={{
            maxWidth: "calc(100vw - 64px)",
            width: `calc(${height} * ${image.childImageSharp.rimg.aspectRatio})`,
            maxHeight: height,
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
            borderRadius: 2,
            ...(galleryContext.active ? gallerySpecificStyle : {}),
          }}
        />
        {caption && <Caption>{caption}</Caption>}
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
