import React from "react"
import { ComponentStory } from "@storybook/react"
import VerticalScroll, { VerticalScrollProps } from "./VerticalScroll"
import { fireEvent, within } from "@storybook/testing-library"

export default {
  title: "Controls/Vertical Scroll",
  component: VerticalScroll,
}

const Template: ComponentStory<typeof VerticalScroll> = (
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

export const Initial = Template.bind({})

export const ScrollRightButton = Template.bind({})
ScrollRightButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await fireEvent.mouseDown(canvas.getByTitle("Scroll right"))
  await new Promise(resolve => setTimeout(resolve, 2000))
  await fireEvent.mouseUp(canvas.getByTitle("Scroll right"))
}

export const ScrollLeftButton = Template.bind({})
ScrollLeftButton.play = async context => {
  const canvas = within(context.canvasElement)

  ScrollRightButton.play && (await ScrollRightButton.play(context))
  await fireEvent.mouseDown(canvas.getByTitle("Scroll left"))
  await new Promise(resolve => setTimeout(resolve, 2000))
  await fireEvent.mouseUp(canvas.getByTitle("Scroll left"))
}
