import React from "react"
import LocComponent from "./Loc"

export default {
  title: "Post/Location",
  component: LocComponent,
  parameters: {
    staticQuery: {
      icon: {
        publicURL: "marker-icon.png",
      },
      iconRetina: {
        publicURL: "marker-icon-2x.png",
      },
      shadow: {
        publicURL: "marker-shadow.png",
      },
    },
    chromatic: { diffThreshold: 0.7 },
  },
}

export const Location = () => <LocComponent latlong={[47.42122, 10.9863]} />
export const Zoomed = () => (
  <LocComponent latlong={[47.42122, 10.9863]} zoom={5} />
)
