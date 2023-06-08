import { ConfirmationButtonView } from "./ConfirmationButton"
import { ProcessingState } from "./ProcessingState"

export default {
  title: "Doveseed/Confirmation Button",
  component: ConfirmationButtonView,
}

export const Initial = {
  args: {
    submitLabel: "Submit",
    state: ProcessingState.Initial,
    email: "foo@example.com",
    token: "some-opaque-token",
  },
}

export const RequestOngoing = {
  args: {
    ...Initial.args,
    state: ProcessingState.RequestOngoing,
  },
}

export const Success = {
  args: {
    ...Initial.args,
    state: ProcessingState.Success,
  },
}

export const Error = {
  args: {
    ...Initial.args,
    state: ProcessingState.Error,
  },
}
