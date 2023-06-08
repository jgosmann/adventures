import React from "react"
import { StoryFn } from "@storybook/react"
import EmailSubmissionForm, {
  EmailSubmissionFormProps,
} from "./EmailSubmissionForm"
import { ProcessingState } from "./ProcessingState"

export default {
  title: "Doveseed/Email submission form",
  component: EmailSubmissionForm,
}

const Template: StoryFn<typeof EmailSubmissionForm> = ({
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

export const Initial = {
  render: Template,

  args: {
    fixedValue: false,
    submitLabel: "Submit",
    state: ProcessingState.Initial,
  },
}

export const WithEmail = {
  render: Template,

  args: {
    ...Initial.args,
    email: "foo@example.com",
  },
}

export const RequestOngoing = {
  render: Template,

  args: {
    ...WithEmail.args,
    state: ProcessingState.RequestOngoing,
  },
}

export const Success = {
  render: Template,

  args: {
    ...WithEmail.args,
    state: ProcessingState.Success,
  },
}

export const Error = {
  render: Template,

  args: {
    ...WithEmail.args,
    state: ProcessingState.Error,
  },
}

export const FixedValue = {
  render: Template,

  args: {
    ...WithEmail.args,
    fixedValue: true,
  },

  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
