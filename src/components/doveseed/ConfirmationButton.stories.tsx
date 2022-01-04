import { ComponentStory } from "@storybook/react"
import React from "react"
import {
  ConfirmationButtonView,
  ConfirmationButtonViewProps,
} from "./ConfirmationButton"
import { ProcessingState } from "./ProcessingState"

export default {
  title: "Doveseed/Confirmation Button",
  component: ConfirmationButtonView,
}

const Template: ComponentStory<typeof ConfirmationButtonView> = (
  args: ConfirmationButtonViewProps
) => <ConfirmationButtonView {...args} />

export const Initial = Template.bind({})
Initial.args = {
  submitLabel: "Submit",
  state: ProcessingState.Initial,
  email: "foo@example.com",
  token: "some-opaque-token",
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
