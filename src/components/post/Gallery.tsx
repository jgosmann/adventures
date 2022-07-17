import React from "react"

export const GalleryContext = React.createContext({
  active: false,
  large: false,
})

export interface GalleryProps {
  children?: React.ReactNode
  large?: boolean
}

const Gallery = ({ children, large }: GalleryProps) => (
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

export default Gallery
