import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import React from "react"

import ClimbingLog from "./ClimbingLog"
import { LocalStorageGradeContext } from "./ClimbingLog/Grade"
import ContentStyleWrapper from "../ContentStyleWrapper"
import ElevationProfile from "./ElevationProfile"
import Gallery from "./Gallery"
import GpxTrack from "./GpxTrack"
import Grade from "./ClimbingLog/Grade"
import Loc from "./Loc"
import Nextday from "./Nextday"
import Pano from "./Pano"
import Rimg from "./Rimg"
import Travel from "./Travel"
import Video from "./Video"
import WithRemoteGpxTrack from "./WithRemoteGpxTrack"

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
    overlay: resources(filter: { relativePath: { glob: "overlay/*" } }) {
      name
      ext
      publicURL
    }
    panoramas: resources(filter: { relativePath: { glob: "pano/*" } }) {
      ...Pano_data
      name
      ext
    }
    panoramas2x: resources(filter: { relativePath: { glob: "pano/*" } }) {
      ...Pano2x_data
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

const earthRadiusMeters = 6371e3
const calcDistKilometers = (p1, p2) => {
  const phi1 = (p1.lat * Math.PI) / 180
  const phi2 = (p2.lat * Math.PI) / 180
  const deltaPhi = ((p2.lat - p1.lat) * Math.PI) / 180
  const deltaLambda = ((p2.lon - p1.lon) * Math.PI) / 180
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (earthRadiusMeters * c) / 1000
}

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
  const BoundElevationProfile = ({ src }) => (
    <WithRemoteGpxTrack
      url={gpxTracks[src]}
      render={track => (
        <ElevationProfile
          data={(track?.segments || [])
            .flatMap(segment => segment)
            .reduce((mappedArray, point) => {
              const distKilometers =
                mappedArray.length === 0
                  ? 0
                  : mappedArray[mappedArray.length - 1].distKilometers +
                    calcDistKilometers(
                      mappedArray[mappedArray.length - 1],
                      point
                    )
              mappedArray.push({
                lat: point.lat,
                lon: point.lon,
                distKilometers,
                elevationMeters: point.elevationMeters,
              })
              return mappedArray
            }, [])}
        />
      )}
    />
  )
  BoundElevationProfile.propTypes = {
    src: PropTypes.string.isRequired,
  }

  const videos = Object.assign(
    {},
    ...mdx.videos.map(video => ({
      [video.relativePath.replace(/^[^/]+\//, "")]: video.videoH264.path,
    }))
  )
  const BoundVideo = ({ src }) => <Video src={videos[src]} />
  BoundVideo.propTypes = {
    src: PropTypes.string.isRequired,
  }

  const bindImages = (Component, imageData, overlayData) => {
    const images = Object.assign(
      {},
      ...imageData.map(img => ({ [img.name + img.ext]: img }))
    )
    const overlays = Object.assign(
      {},
      ...overlayData.map(overlay => ({ [overlay.name + overlay.ext]: overlay }))
    )
    const BoundImage = ({ src, overlay, ...props }) => (
      <Component
        image={images[src]}
        overlay={overlay && overlays[overlay].publicURL}
        {...props}
      />
    )
    BoundImage.propTypes = {
      overlay: PropTypes.string,
      src: PropTypes.string.isRequired,
    }
    return BoundImage
  }

  const BoundNextday = () => <Nextday path={nextPath} />

  const mdxComponents = {
    ElevationProfile: BoundElevationProfile,
    Gallery,
    GpxTrack: BoundGpxTrack,
    Grade,
    Link,
    Loc,
    Nextday: BoundNextday,
    Pano: bindImages(Pano, mdx.panoramas, mdx.overlay),
    Pano2x: bindImages(Pano, mdx.panoramas2x, mdx.overlay),
    Rimg: bindImages(Rimg, mdx.images, mdx.overlay),
    Travel,
    Video: BoundVideo,
  }

  return (
    <ContentStyleWrapper>
      <LocalStorageGradeContext>
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
        {mdx.climbs.length > 0 && (
          <ClimbingLog climbs={mdx.climbs[0].childClimbsYaml} />
        )}
      </LocalStorageGradeContext>
    </ContentStyleWrapper>
  )
}

Content.propTypes = {
  nextPath: PropTypes.string,
  mdx: PropTypes.object.isRequired,
}

export default Content
