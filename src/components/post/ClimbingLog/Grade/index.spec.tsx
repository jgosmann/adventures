import { act, fireEvent, render, screen } from "@testing-library/react"
import { setStaticQuery } from "../../../../../test/mockStaticQuery"
import userEvent from "@testing-library/user-event"
import React from "react"
import Grade from "."
import GradeContext from "./GradeContext"
import { BoulderingGradeSystem, SportGradeSystem } from "./types"
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup"

describe("Grade", () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()

    setStaticQuery({
      allClimbingGradesCsv: {
        nodes: [
          {
            YDS: "5.11d",
            french: "7a+",
            UIAA: "8+",
            Fb_bloc: "5c",
            Fb_trav: "5c+",
            V: "V0",
          },
          {
            YDS: "5.12a",
            french: "7b",
            UIAA: "8+/9-",
            Fb_bloc: "6a",
            Fb_trav: "6a+",
            V: "V1",
          },
        ],
      },
    })

    let state: {
      defaultBoulderingGradeSystem: BoulderingGradeSystem | null
      defaultSportGradeSystem: SportGradeSystem | null
    } = {
      defaultBoulderingGradeSystem: null,
      defaultSportGradeSystem: "YDS",
    }
    render(
      <GradeContext.Provider
        value={{
          ...state,
          getDefaultSystem: () => state.defaultSportGradeSystem,
          setDefaultGradeSystems: newState => {
            state = { ...state, ...newState }
          },
        }}
      >
        <Grade system="UIAA" value="8+" />
      </GradeContext.Provider>
    )
  })

  it("displays the grade in the selected default system", () => {
    expect(screen.getByTestId("grade-system")).toHaveTextContent("YDS")
  })

  it("lists the grade conversions in the title text", () => {
    expect(screen.getByTestId("grade").title).toEqual(
      "UIAA 8+\nYDS 5.11d\nfrench 7a+"
    )
  })

  describe("initially", () => {
    it("does not show the grade selector", () => {
      expect(screen.getByTestId("grade-selector")).toHaveStyleRule(
        "opacity",
        "0"
      )
    })
  })

  describe("when clicking the Grade component", () => {
    beforeEach(() => {
      act(() => screen.getByTestId("grade").click())
    })

    it("shows the selector with the grade conversions", () => {
      expect(screen.getByTestId("grade-selector")).toHaveStyleRule(
        "opacity",
        "1"
      )
    })

    describe("when clicking in the selector", () => {
      beforeEach(() => {
        act(() => screen.getByTestId("grade-selector").click())
      })

      it("still shows the selector", () => {
        expect(screen.getByTestId("grade-selector")).toHaveStyleRule(
          "opacity",
          "1"
        )
      })
    })

    describe("when clicking outside the popup", () => {
      beforeEach(() => {
        act(() => screen.getByTestId("grade-selector").parentElement?.click())
      })

      it("hides the selector", () => {
        expect(screen.getByTestId("grade-selector")).toHaveStyleRule(
          "opacity",
          "0"
        )
      })
    })

    describe("when pressing Escape", () => {
      beforeEach(async () => {
        await act(async () => {
          await user.type(screen.getByTestId("grade-selector"), "{Escape}")
        })
      })

      it("hides the selector", () => {
        expect(screen.getByTestId("grade-selector")).toHaveStyleRule(
          "opacity",
          "0"
        )
      })
    })

    describe("when losing focus", () => {
      beforeEach(() => {
        act(() => {
          fireEvent.blur(screen.getByTestId("grade-selector"))
        })
      })

      it("hides the selector", () => {
        expect(screen.getByTestId("grade-selector")).toHaveStyleRule(
          "opacity",
          "0"
        )
      })
    })

    describe("when changing the default system in the selector", () => {
      beforeEach(() => {
        act(() => {
          screen.getByLabelText("UIAA").click()
          fireEvent.blur(screen.getByTestId("grade-selector"))
        })
      })

      it("changes the used grade system", () => {
        expect(screen.getByTestId("grade-system")).toHaveTextContent("UIAA")
      })
    })
  })
})
