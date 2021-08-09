import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import React from "react"

import Caption from "./Caption"
import VerticalScroll from "../VerticalScroll"

export const dataFragment = graphql`
  fragment Pano_data on File {
    childImageSharp {
      gatsbyImageData(
        height: 600
        layout: FIXED
        transformOptions: { fit: OUTSIDE }
      )
      original {
        height
        width
      }
    }
  }
`

export const dataFragment2x = graphql`
  fragment Pano2x_data on File {
    childImageSharp {
      gatsbyImageData(
        height: 1200
        layout: FIXED
        transformOptions: { fit: OUTSIDE }
      )
      original {
        height
        width
      }
    }
  }
`

const Pano = ({ alt, caption, image }) => {
  const aspectRatio = `(${image.childImageSharp.original.width} / ${image.childImageSharp.original.height})`

  return (
    <div
      css={{
        margin: "32px 0",
        scrollSnapAlign: "start",
        position: "relative",
      }}
    >
      <VerticalScroll>
        <GatsbyImage
          image={getImage(image)}
          alt={alt || caption}
          css={{
            maxHeight: "100vh",
            maxWidth: `calc(100vh * ${aspectRatio})`,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </VerticalScroll>
      {caption && <Caption>{caption}</Caption>}
    </div>
  )
}

Pano.propTypes = {
  alt: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.object.isRequired,
}

export default Pano
