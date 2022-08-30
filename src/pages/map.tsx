import { css, Global } from "@emotion/react"
import { graphql } from "gatsby"
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
  PostPreviewData,
} from "../components/PostPreview"
import { fullHeight } from "../styles"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "react-leaflet-markercluster/dist/styles.min.css"

export interface HeadProps {
  location: {
    pathname: string
  }
}

export const Head = ({ location: { pathname } }: HeadProps) => (
  <HtmlHead path={pathname} />
)

export const pageQuery = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "posts" }, ext: { eq: ".mdx" } }
    ) {
      nodes {
        childMdx {
          id
          frontmatter {
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

export interface MdxChild {
  id: string
  frontmatter: {
    map: string
  }
}

export interface Node extends PostPreviewData {
  childMdx: MdxChild & PostPreviewData["childMdx"]
}

const getNodeLatLng = (node: MdxChild) =>
  JSON.parse(`[${node.frontmatter.map}]`)

export interface MapPageProps {
  data: {
    allFile: {
      nodes: Node[]
    }
  }
  location: {
    pathname: string
  }
}

const MapPage = ({
  data: {
    allFile: { nodes },
  },
  location: { pathname },
}: MapPageProps) => (
  <div css={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Global styles={fullHeight} />
    <Navigation path={pathname} />
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
        boundsOptions={{ padding: [50, 50] }}
        scrollWheelZoom={true}
        dragging={true}
      >
        <MarkerClusterGroup>
          {nodes.map(node => (
            <Marker
              key={node.childMdx.id}
              position={getNodeLatLng(node.childMdx)}
            >
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

export default MapPage
