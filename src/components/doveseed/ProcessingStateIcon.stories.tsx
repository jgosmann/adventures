import React from "react"
import { ProcessingState } from "./ProcessingState"
import ProcessingStateIcon from "./ProcessingStateIcon"

export default {
  title: "Doveseed/Processing State Icon",
  component: ProcessingStateIcon,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export const Initial = () => (
  <ProcessingStateIcon state={ProcessingState.Initial} />
)
export const RequestOngoing = () => (
  <ProcessingStateIcon state={ProcessingState.RequestOngoing} />
)
export const Success = () => (
  <ProcessingStateIcon state={ProcessingState.Success} />
)
export const Error = () => <ProcessingStateIcon state={ProcessingState.Error} />
