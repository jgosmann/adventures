import Pano from "./Pano"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../../test/gatsby-image-fixture"

export default {
  title: "Post/Panorama",
  component: Pano,
  parameters: {
    layout: "fullscreen",
  },
}

const imgFileNode = mockImageFileNode(
  mockGatsbyImage({
    url: "background.png",
    width: 1920,
    height: 1200,
    layout: "fixed",
  })
)

export const Panorama = {
  args: {
    image: {
      ...imgFileNode,
    },
  },
}
