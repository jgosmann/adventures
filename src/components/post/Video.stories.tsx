import VideoComponent from "./Video"

export default {
  title: "Post/Video",
  component: VideoComponent,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export const Video = {
  args: {
    src: "test.mov",
  },
}
