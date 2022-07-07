import { render, screen } from "@testing-library/react"
import React, { useContext, useEffect } from "react"
import GradeContext, {
  DefaultGradeSystems,
  LocalStorageGradeContext,
} from "./GradeContext"
import { System } from "./types"

describe("LocalStorageGradeContext", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  const SetDefaultGradeSystems = (props: Partial<DefaultGradeSystems>) => {
    const { setDefaultGradeSystems } = useContext(GradeContext)
    useEffect(() => {
      setDefaultGradeSystems(props)
    }, [])
    return <></>
  }

  describe("setDefaultGradeSystems", () => {
    const GradeSystems = () => {
      const { defaultBoulderingGradeSystem, defaultSportGradeSystem } =
        useContext(GradeContext)
      return (
        <>
          <div data-testid="defaultBoulderingGradeSystem">
            {defaultBoulderingGradeSystem}
          </div>
          <div data-testid="defaultSportGradeSystem">
            {defaultSportGradeSystem}
          </div>
        </>
      )
    }

    it("can set the default bouldering grade systems", () => {
      render(
        <LocalStorageGradeContext>
          <SetDefaultGradeSystems defaultBoulderingGradeSystem="V" />
          <GradeSystems />
        </LocalStorageGradeContext>
      )
      expect(
        screen.getByTestId("defaultBoulderingGradeSystem")
      ).toHaveTextContent("V")
    })

    it("can set the default sport grade systems", () => {
      render(
        <LocalStorageGradeContext>
          <SetDefaultGradeSystems defaultSportGradeSystem="YDS" />
          <GradeSystems />
        </LocalStorageGradeContext>
      )
      expect(screen.getByTestId("defaultSportGradeSystem")).toHaveTextContent(
        "YDS"
      )
    })

    it("shares the selected systems across contexts", () => {
      render(
        <>
          <LocalStorageGradeContext>
            <SetDefaultGradeSystems
              defaultBoulderingGradeSystem="V"
              defaultSportGradeSystem="YDS"
            />
          </LocalStorageGradeContext>
          <LocalStorageGradeContext>
            <GradeSystems />
          </LocalStorageGradeContext>
        </>
      )

      expect(
        screen.getByTestId("defaultBoulderingGradeSystem")
      ).toHaveTextContent("V")
      expect(screen.getByTestId("defaultSportGradeSystem")).toHaveTextContent(
        "YDS"
      )
    })
  })

  describe("getDefaultSystem", () => {
    const DefaultSystem = ({ system }: { system: System }) => {
      const { getDefaultSystem } = useContext(GradeContext)
      return (
        <div data-testid={`defaultSystem-${system}`}>
          {getDefaultSystem(system)}
        </div>
      )
    }

    it("returns the default system of the matching style", () => {
      render(
        <LocalStorageGradeContext>
          <SetDefaultGradeSystems
            defaultBoulderingGradeSystem="V"
            defaultSportGradeSystem="YDS"
          />
          <DefaultSystem system="V" />
          <DefaultSystem system="Fb_bloc" />
          <DefaultSystem system="YDS" />
          <DefaultSystem system="UIAA" />
        </LocalStorageGradeContext>
      )

      expect(screen.getByTestId("defaultSystem-V")).toHaveTextContent("V")
      expect(screen.getByTestId("defaultSystem-Fb_bloc")).toHaveTextContent("V")
      expect(screen.getByTestId("defaultSystem-YDS")).toHaveTextContent("YDS")
      expect(screen.getByTestId("defaultSystem-UIAA")).toHaveTextContent("YDS")
    })
  })
})
