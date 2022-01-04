import React, { useCallback, useRef, useState } from "react"

import EmailSubmissionForm from "./EmailSubmissionForm"
import { ProcessingState } from "./ProcessingState"

export type OnSubmitHandler = (
  ev: React.FormEvent<HTMLFormElement>,
  email: string,
  token: string
) => void

export interface ConfirmationButtonViewProps {
  submitLabel: string
  state: ProcessingState
  onSubmit?: OnSubmitHandler
  email: string
  token: string
}

export const ConfirmationButtonView = ({
  submitLabel,
  state,
  onSubmit,
  email,
  token,
}: ConfirmationButtonViewProps) => {
  const tokenRef = useRef<HTMLInputElement>(null)
  const onSubmitWithToken = useCallback(
    (ev: React.FormEvent<HTMLFormElement>, email: string) =>
      onSubmit && onSubmit(ev, email, tokenRef.current?.value ?? ""),
    [onSubmit, email]
  )

  return (
    <EmailSubmissionForm
      fixedValue
      onSubmit={onSubmitWithToken}
      submitLabel={submitLabel}
      state={state}
      email={email}
    >
      <input ref={tokenRef} type="hidden" required={true} value={token} />
    </EmailSubmissionForm>
  )
}

export type RenderFunctionProps = {
  state: ProcessingState
  onSubmit: OnSubmitHandler
  email: string
  token: string
}

export interface ConfirmationButtonControllerProps {
  render: (props: RenderFunctionProps) => JSX.Element | null
  url: string
}

export const ConfirmationButtonController = ({
  url,
  render,
}: ConfirmationButtonControllerProps) => {
  const [state, setState] = useState(ProcessingState.Initial)

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, email: string, token: string) => {
      e.preventDefault()
      setState(ProcessingState.RequestOngoing)

      return fetch(url.replace(/\/$/, "") + "/" + email, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setState(
            response.ok ? ProcessingState.Success : ProcessingState.Error
          )
        })
        .catch(() => {
          setState(ProcessingState.Error)
        })
    },
    [url]
  )

  const searchParams = new URLSearchParams(
    typeof window === "undefined" ? "" : window.location.search
  )

  return render({
    onSubmit,
    state,
    email: searchParams.get("email") ?? "",
    token: searchParams.get("token") ?? "",
  })
}

export interface ConfirmationButtonProps {
  url: string
  submitLabel: string
}

const ConfirmationButton = ({ url, submitLabel }: ConfirmationButtonProps) => (
  <ConfirmationButtonController
    url={url}
    render={(props: RenderFunctionProps) => (
      <ConfirmationButtonView submitLabel={submitLabel} {...props} />
    )}
  />
)

export default ConfirmationButton
