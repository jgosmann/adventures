import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EmailSubmissionForm from "./EmailSubmissionForm"
import { ProcessingState } from "./ProcessingState"
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup"

describe("EmailSubmissionForm", () => {
  const submitLabel = "Submit"

  const theInputIsDisabled = () =>
    it("the input is disabled", () => {
      expect(screen.getByPlaceholderText("Email address")).toBeDisabled()
    })
  const theInputIsEnabled = () =>
    it("the input is enabled", () => {
      expect(screen.getByPlaceholderText("Email address")).toBeEnabled()
    })

  const theSubmitButtonIsDisabled = () =>
    it("the submit button is disabled", () => {
      expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled()
    })
  const theSubmitButtonIsEnabled = () =>
    it("the submit button is enabled", () => {
      expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled()
    })

  const theFormIsDisabled = () => {
    theInputIsDisabled()
    theSubmitButtonIsDisabled()
  }
  const theFormIsEnabled = () => {
    theInputIsEnabled()
    theSubmitButtonIsEnabled()
  }

  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  describe("initially", () => {
    beforeEach(() => {
      render(
        <EmailSubmissionForm
          state={ProcessingState.Initial}
          submitLabel={submitLabel}
        />
      )
    })

    theFormIsEnabled()
  })

  describe("when fixed value is set", () => {
    beforeEach(() => {
      render(
        <EmailSubmissionForm
          fixedValue
          state={ProcessingState.Initial}
          submitLabel={submitLabel}
        />
      )
    })

    theInputIsDisabled()
    theSubmitButtonIsEnabled()
  })

  describe("when the form is submitted", () => {
    const onSubmit = jest.fn()

    beforeEach(() => {
      onSubmit
        .mockReset()
        .mockImplementation((ev: React.FormEvent<HTMLFormElement>) =>
          ev.preventDefault()
        )

      render(
        <EmailSubmissionForm
          state={ProcessingState.Initial}
          submitLabel={submitLabel}
          onSubmit={onSubmit}
        />
      )
    })

    describe("through clicking the submit button", () => {
      it("calls onSubmit with the entered email address", async () => {
        const emailAddress = "foo@example.com"
        await user.type(
          screen.getByPlaceholderText("Email address"),
          emailAddress
        )
        await user.click(screen.getByRole("button", { name: /submit/i }))
        expect(onSubmit).toHaveBeenCalledWith(expect.anything(), emailAddress)
      })
    })

    describe("through pressing enter", () => {
      it("calls onSubmit with the entered email address", async () => {
        const emailAddress = "foo@example.com"
        const emailInput = screen.getByPlaceholderText("Email address")
        await user.type(emailInput, emailAddress)
        await user.keyboard("{enter}")
        expect(onSubmit).toHaveBeenCalledWith(expect.anything(), emailAddress)
      })
    })
  })

  describe("when a request is ongoing", () => {
    beforeEach(() => {
      render(
        <EmailSubmissionForm
          state={ProcessingState.RequestOngoing}
          submitLabel={submitLabel}
        />
      )
    })

    theFormIsDisabled()
  })

  describe("when a submission has succeeded", () => {
    beforeEach(() => {
      render(
        <EmailSubmissionForm
          state={ProcessingState.Success}
          submitLabel={submitLabel}
        />
      )
    })

    theFormIsDisabled()
  })

  describe("when a submission has failed", () => {
    beforeEach(() => {
      render(
        <EmailSubmissionForm
          state={ProcessingState.Error}
          submitLabel={submitLabel}
        />
      )
    })

    theFormIsEnabled()
  })
})
