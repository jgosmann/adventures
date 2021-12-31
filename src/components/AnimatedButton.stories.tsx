import React from "react"
import { ComponentStory } from "@storybook/react"

import AnimatedButtonComponent, { AnimatedButtonProps } from "./AnimatedButton"

export default {
  title: "Controls/Animated Button",
  component: AnimatedButtonComponent,
}

const Template: ComponentStory<typeof AnimatedButtonComponent> = (
  args: Omit<AnimatedButtonProps, "children">
) => <AnimatedButtonComponent {...args}>Label</AnimatedButtonComponent>

export const AnimatedButton = Template.bind({})
AnimatedButton.args = {
  title: "Click me!",
}
