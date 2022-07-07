import React from "react"
import { ComponentStory } from "@storybook/react"
import GradeView from "./GradeView"
import { Grade } from "./types"

export default {
  title: "Post/Climbing Log/Grade/Grade View",
  component: GradeView,
}

const Template: ComponentStory<typeof GradeView> = (args: Grade) => (
  <GradeView {...args} />
)

export const Default = Template.bind({})
Default.args = {
  system: "UIAA",
  value: "5+",
}

export const SystemWithUnderscore = Template.bind({})
SystemWithUnderscore.args = {
  system: "Fb_bloc",
  value: "6a+",
}

export const VGrade = Template.bind({})
VGrade.args = {
  system: "V",
  value: "V3",
}
