import { ComponentStory } from "@storybook/react"
import React from "react"
import { ProcessingState } from "./ProcessingState"
import { SubscribeFormView, SubscribeFormViewProps } from "./SubscribeForm"

export default {
  title: "Doveseed/Subscribe Form",
  component: SubscribeFormView,
}

const Template: ComponentStory<typeof SubscribeFormView> = (
  args: SubscribeFormViewProps
) => <SubscribeFormView {...args} />

export const Initial = Template.bind({})
Initial.args = {
  submitLabel: "Submit",
  state: ProcessingState.Initial,
  email: "foo@example.com",
  sitekey: "sitekey",
}

export const RequestOngoing = Template.bind({})
RequestOngoing.args = {
  ...Initial.args,
  state: ProcessingState.RequestOngoing,
}

export const Success = Template.bind({})
Success.args = {
  ...Initial.args,
  state: ProcessingState.Success,
}

export const Error = Template.bind({})
Error.args = {
  ...Initial.args,
  state: ProcessingState.Error,
}
