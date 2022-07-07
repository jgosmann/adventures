import React from "react"
import Selector from "./Selector"
import { render, screen } from "@testing-library/react"

describe("Selector", () => {
  describe("when a different value is selected", () => {
    const onSystemChange = jest.fn()

    beforeEach(() => {
      onSystemChange.mockReset()
      render(
        <Selector
          convertedGrades={[
            { system: "UIAA", value: "5" },
            { system: "YDS", value: "5.6" },
          ]}
          expanded
          xTranslation={0}
          selectedSystem={null}
          id={0}
          onSystemChange={onSystemChange}
        />
      )
      screen.getByLabelText("UIAA").click()
    })

    it("calls onSystemChange", () => {
      expect(onSystemChange).toBeCalledWith("UIAA")
    })
  })

  describe("when the display original grades option is selected", () => {
    const onSystemChange = jest.fn()

    beforeEach(() => {
      onSystemChange.mockReset()
      render(
        <Selector
          convertedGrades={[
            { system: "UIAA", value: "5" },
            { system: "YDS", value: "5.6" },
          ]}
          expanded
          xTranslation={0}
          selectedSystem={"UIAA"}
          id={0}
          onSystemChange={onSystemChange}
        />
      )
      screen.getByLabelText("Show original grades").click()
    })

    it("calls onSystemChange", () => {
      expect(onSystemChange).toBeCalledWith(null)
    })
  })
})
