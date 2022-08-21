import React from "react"
import { ComponentStory } from "@storybook/react"
import VideoComponent, { VideoProps } from "./Video"

export default {
  title: "Post/Video",
  component: VideoComponent,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

const Template: ComponentStory<typeof VideoComponent> = (args: VideoProps) => (
  <VideoComponent {...args} />
)

export const Video = Template.bind({})
Video.args = {
  src: "test.mov",
}
