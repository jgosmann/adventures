import React from "react"
import { ComponentStory } from "@storybook/react"
import Ascent, { AscentProps } from "./Ascent"

export default {
  title: "Post/Climbing Log/Ascent",
  component: Ascent,
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
    chromatic: { disableSnapshot: true },
  },
}

const Template: ComponentStory<typeof Ascent> = (args: AscentProps) => (
  <Ascent {...args} />
)

export const SinglePitch = Template.bind({})
SinglePitch.args = {
  data: {
    name: "La Dura Dura",
    style: "onsight",
    grade: {
      system: "french",
      value: "9b+",
    },
  },
}

export const MultiPitch = Template.bind({})
MultiPitch.args = {
  data: {
    name: "Stairway to Heaven",
    style: null,
    grade: null,
    pitches: [
      {
        name: "Womem in Comfortable Shoes",
        style: "hangdog",
        grade: { system: "YDS", value: "5.10a" },
      },
      {
        name: null,
        style: "onsight",
        grade: { system: "YDS", value: "5.10a" },
      },
      {
        name: "Xenolith Dance",
        style: "aid",
        grade: { system: "YDS", value: "5.10c" },
      },
      {
        name: null,
        style: "onsight",
        grade: { system: "YDS", value: "5.10a" },
      },
      {
        name: "Dyke Link",
        style: "skipped",
        grade: { system: "YDS", value: "5.10a" },
      },
      {
        name: "Moonwatcher",
        style: "hangdog",
        grade: { system: "YDS", value: "5.9" },
      },
      {
        name: null,
        style: "not attempted",
        grade: { system: "YDS", value: "5.10a" },
      },
    ],
  },
}
