import PropTypes from "prop-types"
import React from "react"

export const GalleryContext = React.createContext({
  active: false,
  large: false,
})

// TODO fix for narrow screens
const Gallery = ({ children, large }) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    <GalleryContext.Provider value={{ active: true, large: !!large }}>
      {children}
    </GalleryContext.Provider>
  </div>
)

Gallery.propTypes = {
  children: PropTypes.node,
  large: PropTypes.bool,
}

export default Gallery
