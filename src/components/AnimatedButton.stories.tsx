import React from "react"
import { StoryFn } from "@storybook/react"

import AnimatedButtonComponent, { AnimatedButtonProps } from "./AnimatedButton"

export default {
  title: "Controls/Animated Button",
  component: AnimatedButtonComponent,
}

const Template: StoryFn<typeof AnimatedButtonComponent> = (
  args: Omit<AnimatedButtonProps, "children">
) => <AnimatedButtonComponent {...args}>Label</AnimatedButtonComponent>

export const AnimatedButton = {
  render: Template,

  args: {
    title: "Click me!",
  },
}
