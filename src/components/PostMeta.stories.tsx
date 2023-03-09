import React from "react"
import { ComponentStory } from "@storybook/react"
import PostMeta, { PostMetaProps } from "./PostMeta"

export default {
  title: "Controls/Post Meta",
  component: PostMeta,
}

const Template: ComponentStory<typeof PostMeta> = (args: PostMetaProps) => (
  <PostMeta {...args} />
)

export const AllSet = Template.bind({})
AllSet.args = {
  frontmatter: { date: "2022-07-17T11:19:42Z" },
  fields: { timeToRead: { minutes: 4 } },
}

export const NoneSet = Template.bind({})
NoneSet.args = { frontmatter: { date: null } }
