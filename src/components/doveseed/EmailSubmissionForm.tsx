import React, { useRef } from "react"

import colors from "../../colors"
import { primaryShadedButton } from "../../styles"
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
      css={{
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        borderRadius: 4,
        display: "flex",
        "&:focus-within": {
          boxShadow: `0 0 8px ${colors.accent}`,
        },
      }}
    >
      <input
        ref={emailInput}
        defaultValue={fixedValue ? undefined : email}
        type="email"
        placeholder="Email address"
        required={true}
        disabled={fixedValue || disabled}
        value={fixedValue ? email || "" : undefined}
        css={{
          background: "#fff",
          color: "#000",
          border: "none",
          borderRadius: "4px 0 0 4px",
          padding: 8,
          height: "100%",
          flexGrow: 1,
          outline: "none",
          "&:invalid": {
            border: "none",
            boxShadow: "none",
          },
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        tabIndex={fixedValue ? 0 : -1}
        css={[
          primaryShadedButton,
          {
            borderRadius: "0 4px 4px 0",
            boxShadow: "-1px 0 1px rgba(0, 0, 0, 0.5)",
            margin: 0,
            outline: "none",
          },
          state === "success" ? { background: "#33a11d !important" } : {},
        ]}
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
