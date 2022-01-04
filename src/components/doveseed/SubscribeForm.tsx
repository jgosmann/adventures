import React, { FormEvent, useRef, useState } from "react"

import EmailSubmissionForm from "./EmailSubmissionForm"
import { ProcessingState } from "./ProcessingState"
import ReCaptcha from "./ReCaptcha"

export interface SubscribeFormViewProps {
  onSubmit: (ev: FormEvent, emailValue: string) => void
  submitLabel: string
  email?: string
  state: ProcessingState
  sitekey: string
  onCaptchaComplete?: (captcha: string) => void
  onError?: () => void
}

export const SubscribeFormView = React.forwardRef<
  ReCaptcha,
  SubscribeFormViewProps
>(function SubscribeFormView(componentProps, ref) {
  const {
    onSubmit,
    submitLabel,
    email,
    state,
    sitekey,
    onCaptchaComplete,
    onError,
  } = componentProps
  return (
    <EmailSubmissionForm
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      state={state}
      email={email}
    >
      <ReCaptcha
        ref={ref}
        size="invisible"
        sitekey={sitekey}
        onChange={onCaptchaComplete}
        onError={onError}
        onExpired={onError}
      />
    </EmailSubmissionForm>
  )
})

export type RenderProps = {
  onSubmit: (ev: FormEvent, emailValue: string) => void
  email?: string
  state: ProcessingState
  onCaptchaComplete: (captcha: string) => void
  onError: () => void
  recaptchaRef: React.Ref<ReCaptcha>
}

export interface SubscribeFormControllerProps {
  render: (props: RenderProps) => null | JSX.Element
  url: string
}

export const SubscribeFormController = ({
  render,
  url,
}: SubscribeFormControllerProps) => {
  const [state, setState] = useState(ProcessingState.Initial)

  const email = useRef<string | null>(null)
  const recaptchaRef = useRef<ReCaptcha | null>(null)

  const onSubmit = (ev: FormEvent, emailValue: string) => {
    ev.preventDefault()

    email.current = emailValue
    setState(ProcessingState.RequestOngoing)
    recaptchaRef.current?.execute()
  }

  const onCaptchaComplete = (captcha: string) => {
    return fetch(url.replace(/\/$/, "") + "/" + email.current, {
      method: "POST",
      body: JSON.stringify({ captcha }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        setState(response.ok ? ProcessingState.Success : ProcessingState.Error)
      })
      .catch(() => {
        setState(ProcessingState.Error)
      })
  }

  const onError = () => {
    setState(ProcessingState.Error)
  }

  const searchParams = new URLSearchParams(
    typeof window === "undefined" ? "" : window.location.search
  )

  return render({
    state,
    onSubmit,
    onCaptchaComplete,
    onError,
    email: searchParams.get("email") ?? "",
    recaptchaRef,
  })
}

export interface SubscribeFormProps {
  submitLabel: string
  url: string
}

const SubscribeForm = ({ submitLabel, url }: SubscribeFormProps) => (
  <SubscribeFormController
    url={url}
    render={({ recaptchaRef, ...props }) => (
      <SubscribeFormView
        submitLabel={submitLabel}
        sitekey="6LdL4sEUAAAAAEsmXbX_Z21wla_bM9dhjSe8I5hf"
        ref={recaptchaRef}
        {...props}
      />
    )}
  />
)

export default SubscribeForm
