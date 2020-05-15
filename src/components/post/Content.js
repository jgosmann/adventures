import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import React from "react"

import ClimbingLog from "./ClimbingLog"
import ContentStyleWrapper from "../ContentStyleWrapper"
import Gallery from "./Gallery"
import GpxTrack from "./GpxTrack"
import Loc from "./Loc"
import Nextday from "./Nextday"
import Pano from "./Pano"
import Rimg from "./Rimg"
import Travel from "./Travel"
import Video from "./Video"

export const dataFragment = graphql`
  fragment Content_data on Mdx {
    climbs: resources(filter: { relativePath: { eq: "climbs.yml" } }) {
      childClimbsYaml {
        ...ClimbingLog_data
      }
    }
    gpxTracks: resources(filter: { relativePath: { glob: "*.gpx" } }) {
      publicURL
      name
      ext
    }
    images: resources(filter: { relativePath: { glob: "images/*" } }) {
      ...Rimg_data
      name
      ext
    }
    panoramas: resources(filter: { relativePath: { glob: "pano/*" } }) {
      ...Pano_data
      name
      ext
    }
    videos: resources(filter: { ext: { in: [".m4v", ".mp4"] } }) {
      videoH264 {
        path
      }
      name
      relativePath
    }
  }
`

const Content = ({ mdx, nextPath }) => {
  const gpxTracks = Object.assign(
    {},
    ...mdx.gpxTracks.map(track => ({
      [track.name + track.ext]: track.publicURL,
    }))
  )
  const BoundGpxTrack = ({ src }) => <GpxTrack url={gpxTracks[src]} />
  BoundGpxTrack.propTypes = {
    src: PropTypes.string.isRequired,
  }

  const videos = Object.assign(
    {},
    ...mdx.videos.map(video => ({
      [video.relativePath.replace(/^[^/]+\//, "")]: video.videoH264.path,
    }))
  )
  console.log(videos)
  const BoundVideo = ({ src }) => <Video src={videos[src]} />
  BoundVideo.propTypes = {
    src: PropTypes.string.isRequired,
  }

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
    GpxTrack: BoundGpxTrack,
    Loc,
    Nextday: BoundNextday,
    Pano: bindImages(Pano, mdx.panoramas),
    Rimg: bindImages(Rimg, mdx.images),
    Travel,
    Video: BoundVideo,
  }

  return (
    <ContentStyleWrapper>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
      {mdx.climbs.length > 0 && (
        <ClimbingLog climbs={mdx.climbs[0].childClimbsYaml} />
      )}
    </ContentStyleWrapper>
  )
}

Content.propTypes = {
  nextPath: PropTypes.string,
  mdx: PropTypes.object.isRequired,
}

export default Content
