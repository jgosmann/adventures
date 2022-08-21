import React from "react"
import { ComponentStory } from "@storybook/react"
import { staticQueryData } from "../../test/static-query-data"
import PostListTemplate, { PostListProps } from "../templates/PostList"
import { postPreview } from "../../test/post-preview-fixture"

export default {
  title: "Templates/Post List",
  component: PostListTemplate,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

const Template: ComponentStory<typeof PostListTemplate> = (
  args: PostListProps
) => <PostListTemplate {...args} />

export const PostList = Template.bind({})
PostList.args = {
  data: { allFile: { nodes: [postPreview(0), postPreview(1)] } },
  location: {
    pathname: "/",
  },
  pageContext: {
    prevPage: "prev",
    nextPage: "next",
  },
}
