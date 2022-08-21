import React from "react"
import { ComponentStory } from "@storybook/react"
import ClimbingLogComponent, { ClimbingLogProps } from "."

export default {
  title: "Post/Climbing Log",
  component: ClimbingLogComponent,
  parameters: {
    staticQuery: {
      allClimbingGradesCsv: {
        nodes: [
          {
            YDS: "5.11d",
            french: "7a+",
            UIAA: "8+",
            Fb_bloc: "5c",
            Fb_trav: "5c+",
            V: "V0",
          },
          {
            YDS: "5.12a",
            french: "7b",
            UIAA: "8+/9-",
            Fb_bloc: "6a",
            Fb_trav: "6a+",
            V: "V1",
          },
        ],
      },
    },
  },
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
