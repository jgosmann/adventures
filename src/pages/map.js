import { css, Global } from "@emotion/core"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"

import colors from "../colors"
import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"
import Map from "../components/leaflet/Map"
import Marker from "../components/leaflet/Marker"
import PostPreview, {
  width as PostPreviewWidth,
  height as postPreviewHeight,
} from "../components/PostPreview.js"
import { fullHeight } from "../styles"

import "normalize.css"
import "react-leaflet-markercluster/dist/styles.min.css"

export const pageQuery = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "posts" }, ext: { eq: ".mdx" } }
    ) {
      nodes {
        childMdx {
          id
          frontmatter {
            draft
            map
          }
        }
        ...PostPreview_data
      }
    }
  }
`

const popupStyle = css({
  ".leaflet-popup-content-wrapper": {
    overflow: "hidden",
    padding: 0,
    fontSize: "1rem",
  },
  ".leaflet-popup-content": {
    margin: 0,
    transition: "0.2s",
    position: "relative",
    width: `${PostPreviewWidth}px !important`, // for some reason a width one pixel larger get set directly on the element
    height: postPreviewHeight,
    maxWidth: "calc(100vw - 72px)",
    maxHeight: "calc(100vh - 72px)",
  },
  a: {
    color: "#000",
    "&:hover": {
      color: "#4dd16c9",
    },
  },
  "a.leaflet-popup-close-button": {
    color: "#fff",
    mixBlendMode: "exclusion",

    "&:hover": {
      color: "#dd16c9",
      mixBlendMode: "normal",
    },
  },
})

const getNodeLatLng = node => JSON.parse(`[${node.frontmatter.map}]`)

const IndexPage = ({
  data: {
    allFile: { nodes },
  },
  location: { pathname },
}) => (
  <div css={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <HtmlHead path={pathname} language="en" />
    <Global styles={fullHeight} />
    <Navigation />
    <main
      css={{
        flexGrow: 1,
        "a:hover": { color: colors.accent },
        position: "relative",
        zIndex: 0,
      }}
    >
      <Map
        bounds={nodes.map(node => getNodeLatLng(node.childMdx))}
        padding={[50, 50]}
        scrollWheelZoom={true}
        dragging={true}
      >
        <MarkerClusterGroup>
          {nodes.map(node => (
            <Marker key={node.id} position={getNodeLatLng(node.childMdx)}>
              <Popup css={popupStyle}>
                <PostPreview data={node} />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </Map>
    </main>
  </div>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default IndexPage
