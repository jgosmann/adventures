import "./styles.css"
import React, { useRef } from "react"

import { ProcessingState } from "./ProcessingState"
import ProcessingStateIcon from "./ProcessingStateIcon"
import VCollapsible from "./VCollapsible"

export interface EmailSubmissionFormProps {
  children?: React.ReactNode
  fixedValue?: boolean
  onSubmit?: (ev: React.FormEvent<HTMLFormElement>, email: string) => void
  state: ProcessingState
  submitLabel: string
  email?: string
}

function EmailSubmissionForm({
  fixedValue,
  submitLabel,
  onSubmit,
  state,
  children,
  email,
}: EmailSubmissionFormProps) {
  const emailInput = useRef<HTMLInputElement>(null)

  const disabled =
    state === ProcessingState.RequestOngoing ||
    state === ProcessingState.Success

  return (
    <form
      className="email-submission-form"
      onSubmit={ev => onSubmit && onSubmit(ev, emailInput.current?.value ?? "")}
    >
      <input
        ref={emailInput}
        defaultValue={fixedValue ? undefined : email}
        type="email"
        placeholder="Email address"
        required={true}
        disabled={fixedValue || disabled}
        value={fixedValue ? email || "" : undefined}
      />
      <button
        type="submit"
        disabled={disabled}
        tabIndex={fixedValue ? 0 : -1}
        className="shaded-button shaded-button-primary"
        style={state === "success" ? { background: "#33a11d !important" } : {}}
      >
        <VCollapsible collapsed={state === "initial"}>
          <ProcessingStateIcon state={state} />
        </VCollapsible>
        {submitLabel}
      </button>
      {children}
    </form>
  )
}

export default EmailSubmissionForm
