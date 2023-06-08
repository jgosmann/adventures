import { ProcessingState } from "./ProcessingState"
import { SubscribeFormView } from "./SubscribeForm"

export default {
  title: "Doveseed/Subscribe Form",
  component: SubscribeFormView,
}

export const Initial = {
  args: {
    submitLabel: "Submit",
    state: ProcessingState.Initial,
    email: "foo@example.com",
    sitekey: "sitekey",
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
