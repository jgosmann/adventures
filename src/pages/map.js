import { css, Global } from "@emotion/core"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"

import colors from "../colors"
import HtmlHead from "../components/HtmlHead"
import IndexNavigation from "../components/navigation/IndexNavigation"
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
    allMdx(sort: { fields: frontmatter___publishdate, order: DESC }) {
      nodes {
        id
        frontmatter {
          draft
          map
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
    allMdx: { nodes },
  },
  location: { pathname },
}) => (
  <div css={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <HtmlHead path={pathname} language="en" />
    <Global styles={fullHeight} />
    <IndexNavigation />
    <main css={{ flexGrow: 1, "a:hover": { color: colors.accent } }}>
      <Map
        bounds={nodes.map(node => getNodeLatLng(node))}
        scrollWheelZoom={true}
        dragging={true}
      >
        <MarkerClusterGroup>
          {nodes.map(node => (
            <Marker key={node.id} position={getNodeLatLng(node)}>
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