import React from "react"
import { ComponentStory } from "@storybook/react"
import ClimbingLogComponent, { ClimbingLogProps } from "."
export default {
  title: "Post/Climbing Log",
  component: ClimbingLogComponent,
}

const Template: ComponentStory<typeof ClimbingLogComponent> = (
  args: ClimbingLogProps
) => <ClimbingLogComponent {...args} />

export const ClimbingLog = Template.bind({})
ClimbingLog.args = {
  climbs: {
    ascents: [
      {
        name: "La Dura Dura",
        style: "onsight",
        grade: { system: "french", value: "9b+" },
      },
      {
        name: "Dreamcatcher",
        grade: { system: "YDS", value: "5.14d" },
      },
    ],
  },
}
