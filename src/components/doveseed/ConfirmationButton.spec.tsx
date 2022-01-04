import React from "react"
import { act, render, screen, waitFor } from "@testing-library/react"
import { mockLocation } from "../../../test/mockLocation"
import { rest } from "msw"
import { setupServer } from "msw/node"
import {
  ConfirmationButtonController,
  ConfirmationButtonView,
} from "./ConfirmationButton"
import { ProcessingState } from "./ProcessingState"
import userEvent from "@testing-library/user-event"

describe("ConfirmationButtonController", () => {
  const apiUrl = "http://api.host/confirm"
  const originalLocation = window.location
  const renderMock = jest.fn()

  beforeEach(() => {
    Reflect.deleteProperty(window, "location")
    window.location = mockLocation(
      "https://localhost/path?email=foo@example.com&token=some-opaque-token"
    )

    renderMock.mockReset().mockImplementation(() => null)

    render(<ConfirmationButtonController url={apiUrl} render={renderMock} />)
  })

  afterEach(() => {
    window.location = originalLocation
  })

  it("the email address is extracted from the location", () => {
    expect(renderMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        email: "foo@example.com",
      })
    )
  })

  it("the token is extracted from the location", () => {
    expect(renderMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        token: "some-opaque-token",
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
    const server = setupServer(
      rest.post(`${apiUrl}/foo@example.com`, (req, res, ctx) => {
        if (req.headers.get("Authorization") === "Bearer some-opaque-token") {
          return res(ctx.status(200))
        } else {
          return res(ctx.status(403))
        }
      })
    )

    beforeEach(() => {
      server.listen({ onUnhandledRequest: "error" })
    })

    afterEach(() => {
      server.close()
    })

    describe("when the triggered requests succeeds", () => {
      it("sets the state to 'Success'", async () => {
        await act(async () =>
          renderMock.mock.calls[0][0].onSubmit(
            { preventDefault: jest.fn() },
            "foo@example.com",
            "some-opaque-token"
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

  beforeEach(() => {
    onSubmit
      .mockReset()
      .mockImplementation((ev: React.FormEvent<HTMLFormElement>) =>
        ev.preventDefault()
      )

    render(
      <ConfirmationButtonView
        email="foo@example.com"
        token="some-opaque-token"
        submitLabel="Submit"
        state={ProcessingState.Initial}
        onSubmit={onSubmit}
      />
    )
  })

  describe("when clicking the submit button", () => {
    beforeEach(() => {
      userEvent.click(screen.getByRole("button", { name: /submit/i }))
    })

    it("calls onSubmit with the email and token", () => {
      expect(onSubmit).toHaveBeenLastCalledWith(
        expect.anything(),
        "foo@example.com",
        "some-opaque-token"
      )
    })
  })
})
