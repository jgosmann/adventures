import PropTypes from "prop-types"
import React, { useRef, useState } from "react"

import EmailSubmissionForm from "./EmailSubmissionForm"
import ReCaptcha from "./ReCaptacha"

function SubscribeForm({ submitLabel, url }) {
  const [state, setState] = useState("initial")

  const email = useRef(null)
  const recaptcha = useRef(null)

  const onSubmit = (ev, emailValue) => {
    ev.preventDefault()

    email.current = emailValue
    setState("requestOngoing")
    recaptcha.current.execute()
  }

  const onCaptchaComplete = captcha => {
    return fetch(url.replace(/\/$/, "") + "/" + email.current, {
      method: "POST",
      body: JSON.stringify({ captcha }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        setState(response.ok ? "success" : "error")
      })
      .catch(() => {
        setState("error")
      })
  }

  const onError = () => {
    setState("error")
  }

  return (
    <EmailSubmissionForm
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      state={state}
    >
      <ReCaptcha
        ref={recaptcha}
        size="invisible"
        sitekey="6LdL4sEUAAAAAEsmXbX_Z21wla_bM9dhjSe8I5hf"
        onChange={onCaptchaComplete}
        onError={onError}
        onExpired={onError}
      />
    </EmailSubmissionForm>
  )
}

SubscribeForm.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default SubscribeForm
