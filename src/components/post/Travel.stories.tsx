import React from "react"
import Travel from "./Travel"

export default {
  title: "Post/Travel",
  component: Travel,
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
    chromatic: { diffThreshold: 0.4 },
  },
}

const route: Array<[number, number]> = [
  [48.1384, 11.5683],
  [50.1214, 8.6366],
  [49.2573, -123.1241],
]

export const WithoutIntermediate = () => <Travel route={route} />

export const WithIntermediate = () => <Travel route={route} markIntermediate />

export const Zoomed = () => <Travel route={route} zoom={1} />
