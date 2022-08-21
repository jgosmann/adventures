import React from "react"
import { ComponentStory } from "@storybook/react"
import PostPreviewComponent, { PostPreviewProps } from "./PostPreview"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../test/gatsby-image-fixture"

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
  data: {
    pagePath: "/post/url",
    childMdx: {
      background: mockImageFileNode(
        mockGatsbyImage({
          url: "background.png",
          width: 300,
          height: 250,
          layout: "fixed",
        })
      ),
      frontmatter: {
        title: "Post Title",
        date: "2022-08-21 13:37",
        categories: ["Box 1", "Box 2"],
      },
      timeToRead: 42,
    },
  },
}
