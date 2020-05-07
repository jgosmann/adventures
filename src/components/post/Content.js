import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import React from "react"

import Gallery from "./Gallery"
import Pano from "./Pano"
import Rimg from "./Rimg"

export const dataFragment = graphql`
  fragment Content_data on Mdx {
    images {
      ...Rimg_data
      name
      ext
    }
    panoramas {
      ...Pano_data
      name
      ext
    }
  }
`

const StyleWrapper = styled("div")`
  h1,
  ol,
  p,
  ul,
  h1,
  h2,
  h3 {
    width: 600px;
    max-width: calc(100% - 32px);
    margin-left: auto;
    margin-right: auto;
  }

  p {
    margin-top: 32px;
    margin-bottom: 32px;

    &:empty {
      margin: 0;
    }
  }

  ul {
    padding: 0 20px;
    box-sizing: border-box;

    ul {
      margin: 0;
      max-width: calc(100% - 40px);
    }
  }
`

const Content = ({ mdx }) => {
  const bindImages = (Component, data) => {
    const images = Object.assign(
      {},
      ...data.map(img => ({ [img.name + img.ext]: img }))
    )
    const BoundImage = ({ src, ...props }) => (
      <Component image={images[src]} {...props} />
    )
    BoundImage.propTypes = {
      src: PropTypes.string.isRequired,
    }
    return BoundImage
  }
  const mdxComponents = {
    Gallery,
    Pano: bindImages(Pano, mdx.panoramas),
    Rimg: bindImages(Rimg, mdx.images),
  }

  return (
    <StyleWrapper>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </StyleWrapper>
  )
}

Content.propTypes = {
  mdx: PropTypes.object.isRequired,
}

export default Content
