import { graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React, { useContext, useState } from "react"

import Caption from "./Caption"
import { GalleryContext } from "./Gallery"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRoute, faSlash } from "@fortawesome/free-solid-svg-icons"
import colors from "../../colors"

export const dataFragment = graphql`
  fragment Rimg_data on File {
    childImageSharp {
      rimg: fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid_withWebp
        aspectRatio
      }
    }
    publicURL
  }
`

const Rimg = ({ alt, caption, image, overlay, children }) => {
  const galleryContext = useContext(GalleryContext)
  const [showOverlay, setShowOverlay] = useState(true)

  const height =
    !galleryContext.active || galleryContext.large ? "80vh" : "45vh"
  const gallerySpecificStyle = {
    "@media screen and (min-height: 600px)": {
      width: `calc(45vh * ${image.childImageSharp.rimg.aspectRatio})`,
      maxHeight: "45vh",
    },
  }

  return (
    <div
      css={{
        margin: galleryContext.active ? 16 : 32,
        textAlign: "center",
      }}
    >
      <div css={{ display: "inline-block", position: "relative" }}>
        <a href={image.publicURL} title="View full size">
          <Img
            fluid={image.childImageSharp.rimg}
            alt={alt || caption}
            css={{
              maxWidth: "calc(100vw - 64px)",
              width: `calc(${height} * ${image.childImageSharp.rimg.aspectRatio})`,
              maxHeight: height,
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
              borderRadius: 2,
              ...(galleryContext.active ? gallerySpecificStyle : {}),
            }}
          />
        </a>
        {overlay && showOverlay && (
          <object
            data={overlay}
            type="image/svg+xml"
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></object>
        )}
        {(caption || children || overlay) && (
          <Caption>
            {caption || children}
            {overlay && (
              <div css={{ marginTop: 4 }}>
                <label
                  css={{
                    cursor: "pointer",
                    ["&:hover"]: { color: colors.highlight },
                    ["&:active"]: { color: "#fff" },
                  }}
                >
                  <input
                    type="checkbox"
                    checked={showOverlay}
                    onChange={ev => {
                      setShowOverlay(ev.target.checked)
                    }}
                    css={{ appearance: "none" }}
                  />
                  <span css={{ position: "relative" }}>
                    <FontAwesomeIcon icon={faRoute} fixedWidth /> Show route is{" "}
                    {!showOverlay && (
                      <FontAwesomeIcon
                        icon={faSlash}
                        fixedWidth
                        css={{ position: "absolute", bottom: 0, left: 0 }}
                      />
                    )}
                  </span>
                  {showOverlay ? "on" : "off"}.
                </label>
              </div>
            )}
          </Caption>
        )}
      </div>
    </div>
  )
}

Rimg.propTypes = {
  alt: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.object.isRequired,
  overlay: PropTypes.string,
}

export default Rimg
