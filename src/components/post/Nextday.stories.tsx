import React from "react"
import { ComponentStory } from "@storybook/react"
import NextdayComponent, { NextdayProps } from "./Nextday"

export default {
  title: "Post/Nextday",
  component: NextdayComponent,
}

const Template: ComponentStory<typeof NextdayComponent> = (
  args: NextdayProps
) => <NextdayComponent {...args} />

export const Nextday = Template.bind({})
Nextday.args = {
  path: "foo",
}
