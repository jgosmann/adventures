import React from "react"
import CaptionComponent from "./Caption"

export default {
  title: "Post/Caption",
  component: CaptionComponent,
  paramaters: {
    chromatic: { disableSnapshot: true },
  },
}

export const Caption = () => (
  <CaptionComponent>This is the caption text.</CaptionComponent>
)
