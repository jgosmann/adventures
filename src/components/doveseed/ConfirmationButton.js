import PropTypes from "prop-types"
import React, { useRef, useState } from "react"

import EmailSubmissionForm from "./EmailSubmissionForm"

const ConfirmationButton = ({ url, submitLabel }) => {
  const [state, setState] = useState("initial")
  const token = useRef(null)

  const onSubmit = (e, email) => {
    e.preventDefault()
    setState("requestOngoing")

    return fetch(url.replace(/\/$/, "") + "/" + email, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token.current.value,
      },
    })
      .then(response => {
        setState(response.ok ? "success" : "error")
      })
      .catch(() => {
        setState("error")
      })
  }

  const searchParams = new URLSearchParams(
    typeof window === "undefined" ? "" : window.location.search
  )

  return (
    <EmailSubmissionForm
      fixedValue
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      state={state}
      disabled={true}
    >
      <input
        ref={token}
        type="hidden"
        required={true}
        value={searchParams.get("token") || ""}
      />
    </EmailSubmissionForm>
  )
}

ConfirmationButton.propTypes = {
  submitLabel: PropTypes.string,
  url: PropTypes.string.isRequired,
}

export default ConfirmationButton
