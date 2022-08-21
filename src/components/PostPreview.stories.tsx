import React from "react"
import { ComponentStory } from "@storybook/react"
import PostPreviewComponent, { PostPreviewProps } from "./PostPreview"
import { postPreview } from "../../test/post-preview-fixture"

export default {
  title: "Controls/Post Preview",
  component: PostPreviewComponent,
}

const Template: ComponentStory<typeof PostPreviewComponent> = (
  args: PostPreviewProps
) => (
  <div css={{ width: 300, height: 250, position: "relative" }}>
    <PostPreviewComponent {...args} />
  </div>
)

export const PostPreview = Template.bind({})
PostPreview.args = {
  data: postPreview(0),
}
