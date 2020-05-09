import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import React from "react"

import ClimbingLog from "./ClimbingLog"
import Gallery from "./Gallery"
import Nextday from "./Nextday"
import Pano from "./Pano"
import Rimg from "./Rimg"

export const dataFragment = graphql`
  fragment Content_data on Mdx {
    climbs {
      childClimbsYaml {
        ...ClimbingLog_data
      }
    }
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

const Content = ({ mdx, nextPath }) => {
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

  const BoundNextday = () => <Nextday path={nextPath} />

  const mdxComponents = {
    Gallery,
    Nextday: BoundNextday,
    Pano: bindImages(Pano, mdx.panoramas),
    Rimg: bindImages(Rimg, mdx.images),
  }

  console.log(mdx)

  return (
    <StyleWrapper>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
      {mdx.climbs && <ClimbingLog climbs={mdx.climbs.childClimbsYaml} />}
    </StyleWrapper>
  )
}

Content.propTypes = {
  nextPath: PropTypes.string,
  mdx: PropTypes.object.isRequired,
}

export default Content
