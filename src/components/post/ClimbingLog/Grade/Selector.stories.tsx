import React from "react"
import { ComponentStory } from "@storybook/react"
import Selector, { SelectorProps } from "./Selector"

export default {
  title: "Post/Climbing Log/Grade/Selector",
  component: Selector,
}

const Template: ComponentStory<typeof Selector> = (args: SelectorProps) => (
  <Selector {...args} />
)

export const Default = Template.bind({})
Default.args = {
  convertedGrades: [
    { system: "UIAA", value: "5" },
    { system: "YDS", value: "5.6" },
  ],
  expanded: true,
  xTranslation: 0,
  selectedSystem: null,
  id: 0,
}

export const UiaaSelected = Template.bind({})
UiaaSelected.args = {
  ...Default.args,
  selectedSystem: "UIAA",
}

export const Hidden = Template.bind({})
Hidden.args = {
  ...Default.args,
  expanded: false,
}
