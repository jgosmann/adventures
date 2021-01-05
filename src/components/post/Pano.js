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
    }
  }
`

const Pano = ({ alt, caption, image }) => {
  return (
    <div
      css={{
        margin: "32px 0",
        scrollSnapAlign: "start",
        position: "relative",
        textAlign: "center",
      }}
    >
      <VerticalScroll>
        <GatsbyImage
          image={getImage(image)}
          alt={alt || caption}
          css={{
            maxHeight: "100vh",
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
