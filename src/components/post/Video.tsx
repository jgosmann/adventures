import React, { useContext } from "react"
import { GalleryContext } from "./Gallery"

export interface VideoProps {
  src: string
}

const Video = ({ src }: VideoProps) => {
  const galleryContext = useContext(GalleryContext)

  return (
    <div css={{ textAlign: "center", fontSize: 0, margin: 32 }}>
      <video
        controls
        css={{
          maxHeight: galleryContext.active ? "40vh" : "80vh",
          maxWidth: "100%",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          borderRadius: 2,
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

export default Video
