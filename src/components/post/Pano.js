import { graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"

import Caption from "./Caption"
import VerticalScroll from "../VerticalScroll"

export const dataFragment = graphql`
  fragment Pano_data on File {
    childImageSharp {
      panoSmall: fixed(height: 300, fit: OUTSIDE) {
        ...GatsbyImageSharpFixed_tracedSVG
      }
      pano: fixed(height: 600, fit: OUTSIDE) {
        ...GatsbyImageSharpFixed_tracedSVG
      }
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
        <Img
          fixed={[
            image.childImageSharp.panoSmall,
            {
              ...image.childImageSharp.pano,
              media: "(min-height: 600px)",
            },
          ]}
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
