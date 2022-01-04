import React from "react"
import { ComponentStory } from "@storybook/react"
import EmailSubmissionForm, {
  EmailSubmissionFormProps,
} from "./EmailSubmissionForm"
import { ProcessingState } from "./ProcessingState"

export default {
  title: "Doveseed/Email submission form",
  component: EmailSubmissionForm,
}

const Template: ComponentStory<typeof EmailSubmissionForm> = ({
  fixedValue,
  submitLabel,
  state,
  email,
}: Pick<
  EmailSubmissionFormProps,
  "fixedValue" | "submitLabel" | "state" | "email"
>) => (
  <EmailSubmissionForm
    state={state}
    submitLabel={submitLabel}
    fixedValue={fixedValue}
    email={email}
  >
    <div id="child"></div>
  </EmailSubmissionForm>
)

export const Initial = Template.bind({})
Initial.args = {
  fixedValue: false,
  submitLabel: "Submit",
  state: ProcessingState.Initial,
}

export const WithEmail = Template.bind({})
WithEmail.args = {
  ...Initial.args,
  email: "foo@example.com",
}

export const RequestOngoing = Template.bind({})
RequestOngoing.args = {
  ...WithEmail.args,
  state: ProcessingState.RequestOngoing,
}

export const Success = Template.bind({})
Success.args = {
  ...WithEmail.args,
  state: ProcessingState.Success,
}

export const Error = Template.bind({})
Error.args = {
  ...WithEmail.args,
  state: ProcessingState.Error,
}

export const FixedValue = Template.bind({})
FixedValue.args = {
  ...WithEmail.args,
  fixedValue: true,
}
FixedValue.parameters = {
  chromatic: { disableSnapshot: true },
}
