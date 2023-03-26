import { graphql } from "gatsby"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
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
        formats: [JPG, AVIF]
      )
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
        formats: [JPG, AVIF]
      )
    }
  }
`

export type PanoImage = Queries.Pano_dataFragment

export interface PanoProps {
  alt?: string
  caption?: string
  image: PanoImage
}

const Pano = ({ alt, caption, image }: PanoProps) => {
  const aspectRatio = `(${image.childImageSharp?.gatsbyImageData?.width} / ${image.childImageSharp?.gatsbyImageData?.height})`

  const imageData = getImage(image as ImageDataLike)
  return (
    <div
      css={{
        margin: "32px 0",
        scrollSnapAlign: "start",
        position: "relative",
      }}
    >
      <VerticalScroll>
        {imageData && (
          <GatsbyImage
            image={imageData}
            alt={alt || caption || ""}
            css={{
              maxHeight: "100vh",
              maxWidth: `calc(100vh * ${aspectRatio})`,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
      </VerticalScroll>
      {caption && <Caption>{caption}</Caption>}
    </div>
  )
}

export default Pano
