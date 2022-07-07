import { createGradeConverter } from "./gradeConverter"
import { Grade } from "./types"

describe("convertGrade", () => {
  const convertGrade = createGradeConverter([
    {
      YDS: "5.6",
      french: "5a",
      UIAA: "5-",
      Fb_bloc: "",
      Fb_trav: "3c/4a",
      V: "",
    },
    {
      YDS: "5.7",
      french: "5",
      UIAA: "",
      Fb_bloc: "4a",
      Fb_trav: "4b",
      V: "",
    },
    {
      YDS: "",
      french: "5b",
      UIAA: "5+",
      Fb_bloc: "",
      Fb_trav: "",
      V: "",
    },
    {
      YDS: "5.10c",
      french: "6b",
      UIAA: "7",
      Fb_bloc: "",
      Fb_trav: "",
      V: "",
    },
  ])

  describe("when from and to system are identical", () => {
    const cases: Array<Grade & { name: string }> = [
      {
        name: "exists in conversion table",
        system: "UIAA",
        value: "7",
      },
      {
        name: "does not exist in conversion table",
        system: "UIAA",
        value: "10",
      },
    ]
    cases.forEach(({ name, system, value }) => {
      describe(name, () => {
        it("returns value without change", () => {
          expect(convertGrade(value, system, system)).toEqual({ value, system })
        })
      })
    })
  })

  describe("when the to system is null", () => {
    it("return undefined", () => {
      expect(convertGrade("7", "UIAA", null)).toBeUndefined()
    })
  })

  describe("when an exact conversion exists", () => {
    it("uses the exact conversion", () => {
      expect(convertGrade("7", "UIAA", "YDS")).toEqual({
        system: "YDS",
        value: "5.10c",
      })
    })
  })

  describe("when no exact conversion exists", () => {
    it("returns the nearest lower grade or returns undefined if none exists", () => {
      expect(convertGrade("7", "UIAA", "Fb_trav")).toEqual({
        system: "Fb_trav",
        value: "4b",
      })
      expect(convertGrade("5", "UIAA", "Fb_bloc")).toBeUndefined()
    })
  })
})
