import { render, screen, waitFor } from "@testing-library/react"
import React from "react"
import WithRemoteGpxTrack from "./WithRemoteGpxTrack"

describe("WithRemoteGpxTrack", () => {
  it("calls the render function with the parsed GPX track", async () => {
    const renderFn = jest.fn(() => <div>Rendered.</div>)
    render(<WithRemoteGpxTrack url="/track.gpx" render={renderFn} />)
    await waitFor(() => {
      expect(renderFn).toHaveBeenCalledWith({
        segments: [
          [
            {
              lat: 46.720161,
              lon: 11.658346,
              elevationMeters: 540.68,
            },
            {
              lat: 46.720665,
              lon: 11.658008,
              elevationMeters: 547.95,
            },
          ],
          [
            {
              lat: 46.756634,
              lon: 12.039714,
              elevationMeters: 1075.223,
            },
            {
              lat: 46.756603,
              lon: 12.039679,
              elevationMeters: 1076.544,
            },
          ],
        ],
      })
      expect(screen.queryByText("Rendered.")).toBeInTheDocument()
    })
  })
})
