import React from "react"
import { StoryFn, StoryObj } from "@storybook/react"
import VerticalScroll, { VerticalScrollProps } from "./VerticalScroll"
import { fireEvent, within } from "@storybook/test"

export default {
  title: "Controls/Vertical Scroll",
  component: VerticalScroll,
}

const Template: StoryFn<typeof VerticalScroll> = (
  args: VerticalScrollProps
) => (
  <div style={{ position: "relative", width: 400 }}>
    <VerticalScroll {...args}>
      <div
        style={{
          height: 200,
          width: 600,
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 100%)",
        }}
      ></div>
    </VerticalScroll>
  </div>
)

export const Initial = {
  render: Template,
}

export const ScrollRightButton: StoryObj<typeof VerticalScroll> = {
  render: Template,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await fireEvent.mouseDown(canvas.getByTitle("Scroll right"))
    await new Promise(resolve => setTimeout(resolve, 2000))
    await fireEvent.mouseUp(canvas.getByTitle("Scroll right"))
  },
}

export const ScrollLeftButton: StoryObj<typeof VerticalScroll> = {
  render: Template,

  play: async context => {
    const canvas = within(context.canvasElement)

    ScrollRightButton.play && (await ScrollRightButton.play(context))
    await fireEvent.mouseDown(canvas.getByTitle("Scroll left"))
    await new Promise(resolve => setTimeout(resolve, 2000))
    await fireEvent.mouseUp(canvas.getByTitle("Scroll left"))
  },
}
