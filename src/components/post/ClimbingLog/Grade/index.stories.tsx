import React from "react"
import { StoryFn } from "@storybook/react"
import GradeComponent, { GradeProps } from "."
import GradeContext from "./GradeContext"

export default {
  title: "Post/Climbing Log/Grade",
  component: GradeComponent,
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

const Template: StoryFn<typeof GradeComponent> = (args: GradeProps) => (
  <GradeContext.Provider
    value={{
      defaultBoulderingGradeSystem: null,
      defaultSportGradeSystem: null,
      getDefaultSystem: () => null,
      setDefaultGradeSystems: () => undefined,
    }}
  >
    <GradeComponent {...args} />
  </GradeContext.Provider>
)

export const Grade = {
  render: Template,

  args: {
    system: "UIAA",
    value: "8+",
  },
}
