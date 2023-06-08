import React from "react"
import { StoryFn } from "@storybook/react"
import PostPreviewComponent, { PostPreviewProps } from "./PostPreview"
import { postPreview } from "../../test/post-preview-fixture"

export default {
  title: "Controls/Post Preview",
  component: PostPreviewComponent,
  paramaters: {
    chromatic: { disableSnapshot: true },
  },
}

const Template: StoryFn<typeof PostPreviewComponent> = (
  args: PostPreviewProps
) => (
  <div css={{ width: 300, height: 250, position: "relative" }}>
    <PostPreviewComponent {...args} />
  </div>
)

export const PostPreview = {
  render: Template,

  args: {
    data: postPreview(0),
  },
}
