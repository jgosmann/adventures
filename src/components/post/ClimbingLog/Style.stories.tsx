import React from "react"
import { ComponentStory } from "@storybook/react"
import Style, { StyleProps } from "./Style"

export default {
  title: "Post/Climbing Log/Style",
  component: Style,
  paramaters: {
    chromatic: { disableSnapshot: true },
  },
}

const Template: ComponentStory<typeof Style> = (args: StyleProps) => (
  <Style {...args} />
)

export const FirstAscent = Template.bind({})
FirstAscent.args = {
  ascensionStyle: "fa",
}

export const Onsight = Template.bind({})
Onsight.args = {
  ascensionStyle: "onsight",
}

export const Flash = Template.bind({})
Flash.args = {
  ascensionStyle: "flash",
}

export const Redpoint = Template.bind({})
Redpoint.args = {
  ascensionStyle: "redpoint",
}

export const Repeat = Template.bind({})
Repeat.args = {
  ascensionStyle: "repeat",
}

export const Hangdog = Template.bind({})
Hangdog.args = {
  ascensionStyle: "hangdog",
}

export const Toprope = Template.bind({})
Toprope.args = {
  ascensionStyle: "toprope",
}

export const TopropeHangdog = Template.bind({})
TopropeHangdog.args = {
  ascensionStyle: "toprope-hangdog",
}

export const Aid = Template.bind({})
Aid.args = {
  ascensionStyle: "aid",
}

export const Bailed = Template.bind({})
Bailed.args = {
  ascensionStyle: "bailed",
}

export const Skipped = Template.bind({})
Skipped.args = {
  ascensionStyle: "skipped",
}

export const NotAttempted = Template.bind({})
NotAttempted.args = {
  ascensionStyle: "not attempted",
}
