import React from "react"
import { act, render, screen, waitFor } from "@testing-library/react"
import { mockLocation } from "../../../test/mockLocation"
import {
  ConfirmationButtonController,
  ConfirmationButtonView,
} from "./ConfirmationButton"
import { ProcessingState } from "./ProcessingState"
import userEvent from "@testing-library/user-event"
import { doveseedApiUrl, validBearerToken } from "../../mocks/handlers"
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup"

describe("ConfirmationButtonController", () => {
  const apiUrl = `${doveseedApiUrl}/confirm`
  const originalLocation = window.location
  const renderMock = jest.fn()

  beforeEach(() => {
    Reflect.deleteProperty(window, "location")
    window.location = mockLocation(
      `https://localhost/path?email=foo@example.com&token=${validBearerToken}`
    )

    renderMock.mockReset().mockImplementation(() => null)

    render(<ConfirmationButtonController url={apiUrl} render={renderMock} />)
  })

  afterEach(() => {
    window.location = originalLocation
  })

  it("the email address is extracted from the location", async () => {
    await waitFor(() =>
      expect(renderMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          email: "foo@example.com",
        })
      )
    )
  })

  it("the token is extracted from the location", async () => {
    await waitFor(() =>
      expect(renderMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          token: validBearerToken,
        })
      )
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
    describe("when the triggered requests succeeds", () => {
      it("sets the state to 'Success'", async () => {
        await act(async () =>
          renderMock.mock.calls[0][0].onSubmit(
            { preventDefault: jest.fn() },
            "foo@example.com",
            validBearerToken
          )
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
            "foo@example.com",
            "wrong-token"
          )
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
      <ConfirmationButtonView
        email="foo@example.com"
        token={validBearerToken}
        submitLabel="Submit"
        state={ProcessingState.Initial}
        onSubmit={onSubmit}
      />
    )
  })

  describe("when clicking the submit button", () => {
    beforeEach(async () => {
      await user.click(screen.getByRole("button", { name: /submit/i }))
    })

    it("calls onSubmit with the email and token", () => {
      expect(onSubmit).toHaveBeenLastCalledWith(
        expect.anything(),
        "foo@example.com",
        validBearerToken
      )
    })
  })
})
