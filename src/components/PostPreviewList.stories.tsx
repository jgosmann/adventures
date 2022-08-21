import React from "react"
import { ComponentStory } from "@storybook/react"
import PostPreviewListComponent, {
  PostPreviewListProps,
} from "./PostPreviewList"
import { postPreview } from "../../test/post-preview-fixture"

export default {
  title: "Controls/Post Preview List",
  component: PostPreviewListComponent,
}

const Template: ComponentStory<typeof PostPreviewListComponent> = (
  args: PostPreviewListProps
) => <PostPreviewListComponent {...args} />

export const PostPreviewList = Template.bind({})
PostPreviewList.args = {
  nodes: [postPreview(0), postPreview(1)],
}
