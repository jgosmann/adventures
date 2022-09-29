import React from "react"
import { act, render, screen, waitFor } from "@testing-library/react"
import { mockLocation } from "../../../test/mockLocation"
import { ProcessingState } from "./ProcessingState"
import {
  RenderProps,
  SubscribeFormController,
  SubscribeFormView,
} from "./SubscribeForm"
import ReCaptcha from "./ReCaptcha"
import userEvent from "@testing-library/user-event"
import { doveseedApiUrl } from "../../mocks/handlers"
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup"

describe("SubscribeFormController", () => {
  const apiUrl = `${doveseedApiUrl}/subscribe`
  const originalLocation = window.location
  const renderMock = jest.fn()

  beforeEach(() => {
    Reflect.deleteProperty(window, "location")
    window.location = mockLocation(
      "https://localhost/path?email=initial@example.com&token=some-opaque-token"
    )

    renderMock
      .mockReset()
      .mockImplementation(({ recaptchaRef, ...props }: RenderProps) => (
        <ReCaptcha
          sitekey="sitekey"
          size="invisible"
          ref={recaptchaRef}
          {...props}
        />
      ))

    render(<SubscribeFormController url={apiUrl} render={renderMock} />)
  })

  afterEach(() => {
    window.location = originalLocation
  })

  it("the email address is extracted from the location", () => {
    expect(renderMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        email: "initial@example.com",
      })
    )
  })

  describe("initially", () => {
    it("the state is 'Initial'", () => {
      expect(renderMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          state: ProcessingState.Initial,
        })
      )
    })
  })

  describe("when onSubmit is called", () => {
    beforeEach(() => {
      const grecaptchaMock = {
        render: jest.fn(() => 123),
        reset: jest.fn(),
        getResponse: jest.fn(),
        execute: jest.fn(() =>
          renderMock.mock.calls[0][0].onCaptchaComplete("captcha")
        ),
        ready: jest.fn(),
      }
      global.grecaptcha = {
        ...grecaptchaMock,
        enterprise: grecaptchaMock,
      }
    })

    describe("when the triggered requests succeeds", () => {
      it("sets the state to 'Success'", async () => {
        await act(async () =>
          renderMock.mock.calls[0][0].onSubmit(
            { preventDefault: jest.fn() },
            "foo@example.com"
          )
        )
        await waitFor(() =>
          expect(global.grecaptcha.execute).toHaveBeenCalled()
        )
        await act(async () =>
          renderMock.mock.calls[0][0].onCaptchaComplete("captcha")
        )
        await waitFor(() =>
          expect(renderMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
              state: ProcessingState.Success,
            })
          )
        )
      })
    })

    describe("when the request fails", () => {
      it("sets the state to 'Error'", async () => {
        await act(async () =>
          renderMock.mock.calls[0][0].onSubmit(
            { preventDefault: jest.fn() },
            "failure@example.com"
          )
        )
        await waitFor(() =>
          expect(global.grecaptcha.execute).toHaveBeenCalled()
        )
        await act(async () =>
          renderMock.mock.calls[0][0].onCaptchaComplete("captcha")
        )
        await waitFor(() =>
          expect(renderMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
              state: ProcessingState.Error,
            })
          )
        )
      })
    })

    describe("when the captcha fails", () => {
      it("sets the state to 'Error'", async () => {
        await act(async () =>
          renderMock.mock.calls[0][0].onSubmit(
            { preventDefault: jest.fn() },
            "failure@example.com"
          )
        )
        await waitFor(() =>
          expect(global.grecaptcha.execute).toHaveBeenCalled()
        )
        await act(async () => renderMock.mock.calls[0][0].onError())
        await waitFor(() =>
          expect(renderMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
              state: ProcessingState.Error,
            })
          )
        )
      })
    })
  })
})

describe("ConfirmationButtonView", () => {
  const onSubmit = jest.fn()
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    onSubmit
      .mockReset()
      .mockImplementation((ev: React.FormEvent<HTMLFormElement>) =>
        ev.preventDefault()
      )

    render(
      <SubscribeFormView
        email="foo@example.com"
        submitLabel="Submit"
        state={ProcessingState.Initial}
        onSubmit={onSubmit}
        sitekey="sitekey"
      />
    )
  })

  describe("when clicking the submit button", () => {
    beforeEach(async () => {
      await user.click(screen.getByRole("button", { name: /submit/i }))
    })

    it("calls onSubmit with the email", () => {
      expect(onSubmit).toHaveBeenLastCalledWith(
        expect.anything(),
        "foo@example.com"
      )
    })
  })
})
