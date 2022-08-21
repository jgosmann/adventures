import React from "react"
import { ComponentStory } from "@storybook/react"
import PostPreviewListComponent, {
  PostPreviewListProps,
} from "./PostPreviewList"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../test/gatsby-image-fixture"

export default {
  title: "Controls/Post Preview List",
  component: PostPreviewListComponent,
}

const Template: ComponentStory<typeof PostPreviewListComponent> = (
  args: PostPreviewListProps
) => <PostPreviewListComponent {...args} />

export const PostPreviewList = Template.bind({})
PostPreviewList.args = {
  nodes: [
    {
      pagePath: "/post/url0",
      childMdx: {
        id: "id0",
        background: mockImageFileNode(
          mockGatsbyImage({
            url: "background.png",
            width: 300,
            height: 250,
            layout: "fixed",
          })
        ),
        frontmatter: {
          title: "Post Title 0",
          date: "2022-08-21 13:37",
          categories: ["Box 1", "Box 2"],
        },
        timeToRead: 42,
      },
    },
    {
      pagePath: "/post/url1",
      childMdx: {
        id: "id1",
        background: mockImageFileNode(
          mockGatsbyImage({
            url: "background.png",
            width: 300,
            height: 250,
            layout: "fixed",
          })
        ),
        frontmatter: {
          title: "Post Title 1",
          date: "2022-08-21 13:38",
          categories: ["Box 3"],
        },
        timeToRead: 23,
      },
    },
  ],
}
